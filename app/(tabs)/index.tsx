import { Animated, PanResponder, View, Alert, Pressable, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons, MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../ThemeContext"; // Import the ThemeContext
import { openDatabase } from "@/storage/sqlite";
import { useEffect, useState, useRef, useMemo } from "react";
import { Tracker } from "@/types/Tracker";
import { Section } from "@/types/Section";
import { useState as useReactState } from "react";
import { useTrackerStore } from "@/storage/store"; // Import the Zustand store
import { getImage } from "../trackerList"; // Import the getImage function
import { CalendarProps } from "../../components/CalendarComponent";
import NewSectionModal from "@/components/SectionModal";

import { getIconInfo } from "@/types/Misc";

import { useSectionStore } from "@/storage/store";
import type { TimePeriod } from "@/types/Tracker";
import { parseAsync } from "@babel/core";

// Used in square icon styling for dynamic styles - grid same for all phone sizes
const screenWidth = Dimensions.get("window").width;
const itemsPerRow = 4;
const spacing = 12;
const totalSpacing = spacing * (itemsPerRow + 1);
const sidesPadding = 16; // for grid mostly
const itemSize = (screenWidth - totalSpacing - sidesPadding * 2) / itemsPerRow;

export default function Index() {
  const router = useRouter();
  const { currentTheme } = useTheme(); // Get the current theme from context

  //backend structures
  const trackers = useTrackerStore((state) => state.trackers);
  const sections = useSectionStore((state) => state.sectionsH);
  const addTrackerToSection = useSectionStore((state) => state.addTrackerToSection);
  /* States */
  //modal states
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useReactState(false);
  const [targetSection, setTargetSection] = useReactState<Section | null>(null);

  //Time Period States (+ mode of calendar)
  type CalendarMode = CalendarProps["mode"];
  const buttons: CalendarMode[] = ["Daily", "Weekly", "Monthly"];
  const [selected, setSelected] = useState<CalendarMode>("Daily");

  //Edit mode states
  const [editMode, setEditMode] = useState(false);
  const [exitedEdit, setExitedEdit] = useState(false); //if just exited (fixes slight bug)
  const [movingSection, setMovingSection] = useState(false);
  const [movingSections, setMovingSections] = useState({}); //stores the movement state of all sections
  const [currentMovingSection, setCurrentMovingSection] = useState<string | null>(null);
  const [currentMovingPos, setCurrentMovingPos] = useState<number>(-1);
  const sectionHeights : Number[] = [];

  //Edit mode refs
  const panRefs = useRef<{ [key: string]: Animated.ValueXY }>({});
  const pan = useRef(new Animated.ValueXY()).current; //ref to section being moved
  const scrollEnabledState = useRef(true); // Track scroll state
  const scrollRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<{ [key: string]: View | null }>({});

  //function to get size and pos of section given title ()
  const getSectInfo = (sectionTitle: string): {height: number, position: number} => { //ONLY CALL WHEN ALREADY UNWRAPPED SECTION
    const section : Section =  sections.find((s) => s.sectionTitle === sectionTitle && s.timePeriod === selected)!
    var sectHeight : number = 44; //(24) {fontsize} + (2 * 10) {padding size}
    var position : number = -1;
    //console.log("sect to add to 44: "+spacing *(Math.ceil((itemsPerRow +1)/ 4))+" calculation = "+Math.ceil((itemsPerRow + 1)/4))
    if(section){
      const rows = Math.ceil((section.trackers.length +1)/ 4);
      sectHeight += (spacing + itemSize) *(rows); //spacing per row
      position = section.position;
    }
    return {height: sectHeight, position: position}
  }

  //finds section given y coord
  const findSectionAtPosY = async (touchY: number): Promise<Section> => { 
    const measurements = await Promise.all(
      sections.map(section => {
        return new Promise<{ id: string, y: number, height: number }>((resolve) => {
          const ref = sectionRefs.current[`${section.sectionTitle}-${section.timePeriod}`];
          if (!ref) return resolve({ id: `${section.sectionTitle}-${section.timePeriod}`, y: Infinity, height: 0 });
  
          ref.measure((x, y, width, height, pageX, pageY) => { //measurements of reference
            resolve({ id: `${section.sectionTitle}-${section.timePeriod}`, y: pageY, height });
          });
        });
      })
    );
  
    const found = measurements.find(m => touchY >= m.y && touchY <= m.y + m.height);
  
    if (!found) throw new Error('No section found at touch position');
    const section = sections.find(section => `${section.sectionTitle}-${section.timePeriod}` === found.id);
    if (!section) throw new Error('Section not found in state');
  
    return section;
  };

  //Function to respond to section movement
  const panResponder = useMemo(() => PanResponder.create({
      onStartShouldSetPanResponder: () => editMode, // only drag if in edit mode
      onMoveShouldSetPanResponder: () => editMode, //edit mode also

      onPanResponderGrant: (e) => { //if granted (edit mode)
        
        const touchY = e.nativeEvent.pageY;
        findSectionAtPosY(touchY).then((section) => {
          if (section) {
            const sectionKey = `${section.sectionTitle}-${section.timePeriod}`;
            setCurrentMovingSection(sectionKey);

            const pan = panRefs.current[sectionKey];
            pan?.extractOffset();
          } else {
          }
        });
        setMovingSection(true);
        
        /*Stops parent scroll view from interfering*/
        scrollEnabledState.current = false; 
        if (scrollRef.current) {
          scrollRef.current.setNativeProps({ scrollEnabled: false });
        }
      },


      onPanResponderMove: (_, gestureState) => {
        const pan = panRefs.current[currentMovingSection!]; //force (oops)
        if (pan){ pan.setValue({ x: 0, y: gestureState.dy })};
        //console.log(`dy: ${gestureState.dy}`);

      },

      onPanResponderRelease: () => {
        const pan = panRefs.current[currentMovingSection!];
        pan?.flattenOffset();
        /*Reallows interference*/
        scrollEnabledState.current = true;
        if (scrollRef.current) {
          scrollRef.current.setNativeProps({ scrollEnabled: true });
        }
        setMovingSection(false);
      },
    }), [editMode, currentMovingSection]);

  // Dynamic styles for square icon buttons
  const squareIconButtonStyle = (size: number) => ({
    ...styles.squareIconButton,
    backgroundColor: currentTheme["101010"],
    borderColor: currentTheme.dimgray,
    width: size,
    height: size,
  });

  //Modal functions
  const handlePlusPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTargetSection(null);
  };

  return (
    //whole screen
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme["101010"] }]}>
      <StatusBar style="light" />
      {/* This view is for the top-left and top-right icons */}
      <View style={styles.topRow}>
        <Pressable
          onPress={() => router.push("/Profile")}
          style={[styles.cornerButton, { backgroundColor: currentTheme["101010"] }]}
        >
          <MaterialCommunityIcons name="account" size={40} color={currentTheme.white} />
        </Pressable>
        {buttons.map((btn) => (
          <TouchableOpacity
            key={btn}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor: "transparent", // Always transparent
            }}
            onPress={() => setSelected(btn)}
          >
            <Text
              style={{
                color: selected === btn ? currentTheme.white : currentTheme.gray,
                fontWeight: selected === btn ? "bold" : "500",
                fontSize: selected === btn ? 17 : 15,
              }}
            >
              {btn}
            </Text>
          </TouchableOpacity>
        ))}
        <Pressable
          onPress={() => router.push("/newTrackerView")}
          style={[styles.cornerButton, { backgroundColor: currentTheme["101010"] }]}
        >
          <Entypo name="plus" size={40} color={currentTheme.white} />
        </Pressable>
      </View>

      <ScrollView
        ref = {scrollRef} //whether scroll is enabled
        scrollEnabled = {scrollEnabledState.current}
        onStartShouldSetResponder={() => !scrollEnabledState.current}
        contentContainerStyle={[
        styles.scrollView,
        {}
      ]}>
        <Pressable
        pointerEvents="auto"
        onLongPress={()=> { //on long press edit
          (!editMode && !exitedEdit) && setEditMode(true);
        }}
        onPressIn={(e) =>{ //press in to close edit
          editMode && (setEditMode(false), setExitedEdit(true));
        }}
        onPressOut={() =>{
          !editMode && setExitedEdit(false);
        }}
        style={[
          styles.scrollView,
          {
            paddingHorizontal: 5,}
        ]}
        >
        <View style={styles.progressContainer}>
          <Progress.Circle
            size={100} // Size of the circle
            progress={0.76} // 76% progress
            thickness={10} // Border thickness
            showsText={false} // We add text separately
            color={currentTheme.lightgreen} // Progress color
            unfilledColor={currentTheme.dimgray} // Background color
            borderWidth={0} // No border
          />
          <Text style={[styles.progressText, { color: currentTheme.white }]}>76%</Text>
        </View>

        {/*START dynamic sections rendering */}
        {sections
          .filter((s) => s.timePeriod === selected)
          .sort((a, b) => a.position - b.position)
          .map((section) => {
            //for each section map their heights (ordered by position)
            const {height} = getSectInfo(section.sectionTitle);
            sectionHeights.push(height)
            const sectionKey = `${section.sectionTitle}-${section.timePeriod}`;
            if (!panRefs.current[sectionKey]) {
              panRefs.current[sectionKey] = new Animated.ValueXY();
            }
            const pan = panRefs.current[sectionKey];
            return(
            <View 
              key={`${section.sectionTitle}-${section.timePeriod}`}
              ref={ref => sectionRefs.current[`${section.sectionTitle}-${section.timePeriod}`] = ref}
              onStartShouldSetResponder={() => true}
              onResponderGrant={(e) => {
                if (editMode) {
                  const touchY = e.nativeEvent.pageY;
                  findSectionAtPosY(touchY).then((section) => {
                    if (section) {
                      setCurrentMovingSection(`${section.sectionTitle}-${section.timePeriod}`);
                    }
                  });
                }
              }}
              onResponderStart={(e) => {
                // Block the press event from parent 
                if (editMode) {
                  e.stopPropagation();
                }
              }}
            >
            <Animated.View //Moveable view (on edit mode)
            
            style = {[
              pan.getLayout(), //stored in pan object created by useRef earlier
              {borderWidth: 1,
                borderRadius: 8,
                borderColor: editMode ? currentTheme["lowOpacityWhite"] : 'transparent',
                marginTop: section.position === 0 ? 30 : 15, //num1 from circle, num2 from other sections
                paddingVertical: 10,
                width: '100%',
                minWidth: '100%',
                backgroundColor: (movingSection && (currentMovingSection === `${section.sectionTitle}-${section.timePeriod}`)) ? currentTheme['lowOpacityWhite'] : 'transparent',
              }
            ]}
            {...(currentMovingSection === `${section.sectionTitle}-${section.timePeriod}` ? panResponder.panHandlers : {})}//passing gesture handlers into view
            
            >


              {/* Section Title */}
              <Text style={[styles.title, { color: currentTheme.white }]}>
                {section.sectionTitle}
              </Text>

              {/* Section's Row of Tracker Icons */}
              <View style={styles.iconRow}>
                {section.trackers.map((tracker) => (
                  <Pressable
                    key={tracker.trackerName + tracker.timePeriod}
                    onPress={() =>
                      router.push({
                        pathname: "/editTracker",
                        params: {
                          trackerN: tracker.trackerName,
                          timeP: tracker.timePeriod,
                          color: getIconInfo(tracker.icon).color, 
                          image: getIconInfo(tracker.icon).name
                        },
                      })
                    }
                    style={[
                      squareIconButtonStyle(itemSize),
                    ]}
                  >
                    {getImage(tracker, 40).icon}
                  </Pressable>
                ))}

                {/* Plus button to open modal and store section */}
                <Pressable
                  onPress={() => {
                    setTargetSection(section);     // Store selected section
                    setIsModalVisible(true);       // Show modal
                  }}
                  style={squareIconButtonStyle(itemSize)
                    
                  }
                >
                  <AntDesign name="plus" size={30} color={currentTheme.white} />
                </Pressable>
              </View>
            </Animated.View>
            </View>
            )
            })}
        
        {/* END dynamic sections rendering */}

        <Pressable //section creation
          //onPress={() => create section}
          style={[styles.sectionCreateButton, { borderColor: currentTheme.dimgray }]}
          onPress={() => setSectionModalOpen(true)}
        >
          <AntDesign name="plus" size={50} color={currentTheme.white} />
        </Pressable>

        {/* Modal for the popup */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <View style={[styles.modalOverlay, { backgroundColor: currentTheme["rgba(0, 0, 0, 0.8)"] }]}>
            <View
              style={[styles.modalContent, { backgroundColor: currentTheme["101010"] }]}
            >
              {/* Close button */}
              <Pressable
                onPress={handleCloseModal}
                style={styles.closeButton}
              >
                <AntDesign name="close" size={24} color={currentTheme.white} />
              </Pressable>

              {/* Scrollable content */}
              <ScrollView
                
                style={styles.scrollView2} // Use for non-layout styles like width, height, etc.
                contentContainerStyle={{
                  flexDirection: "row", // Arrange items in rows
                  flexWrap: "wrap", // Allow wrapping to the next row
                  justifyContent: "center", // Center items horizontally
                  paddingBottom: 50, // Add padding if needed
                }}
              >
                {trackers.map((tracker) => (
                  <TouchableOpacity
                    key={tracker.trackerName + tracker.timePeriod}
                    onPress={() => {
                      if (!targetSection) return;
                      const exists = targetSection.trackers.some(
                        (t) => t.trackerName === tracker.trackerName && t.timePeriod === tracker.timePeriod
                      );
                      if (exists) {
                        handleCloseModal();
                        return;
                      }else{
                        addTrackerToSection(
                          targetSection.sectionTitle,
                          targetSection.timePeriod,
                          tracker
                      );
                      handleCloseModal();
                      }
                    }}
                    style={[
                      styles.trackerButton,
                      {
                        borderBottomColor: currentTheme.dimgray,
                        backgroundColor: currentTheme["101010"],
                      },
                    ]}
                  >
                    <View style={styles.iconContainer}>
                      {getImage(tracker, 40).icon}
                    </View>
                    <Text style={styles.trackerText}>{tracker.trackerName}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
        <NewSectionModal
          visible={sectionModalOpen}
          onClose={() => setSectionModalOpen(false)}
        />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  cornerButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
    paddingBottom: 50,
  },
  scrollView2: {
    paddingBottom: 50,
  },

  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 25,
    marginBottom: 20,
  },
  progressText: {
    position: "absolute",
    top: 38,
    left: 29,
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    textAlign: "center",
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  squareIconButton: {
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: spacing / 2,
    marginTop: spacing,
  },
  sectionCreateButton: {
    padding: 12,
    minWidth: '100%', //feel free to change
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'dashed' as const,

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: screenWidth * 0.9,
    height: "70%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
  },

  trackerButton: {
    width: "30%", // Adjust to fit 3 items per row
    aspectRatio: 1, // Make it square
    margin: 10, // Add spacing between buttons
    justifyContent: "center",
    alignItems: "center",
       borderRadius: 10, // Rounded corners
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5, // Space between icon and text
  },

  trackerText: {
    fontSize: 14, // Smaller font size for labels
    fontWeight: "500",
    color: "white",
    textAlign: "center", // Center-align text
  },
});

