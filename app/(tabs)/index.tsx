import { View, Alert, Pressable, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons, MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../ThemeContext"; // Import the ThemeContext
import { openDatabase } from "@/storage/sqlite";
import { useEffect, useState } from "react";
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

// Used in square icon styling for dynamic styles - grid same for all phone sizes
const screenWidth = Dimensions.get("window").width;
const itemsPerRow = 4;
const spacing = 12;
const totalSpacing = spacing * (itemsPerRow + 1);
const sidesPadding = 16; // for grid mostly
const itemSize = (screenWidth - totalSpacing - sidesPadding * 2) / itemsPerRow;

export default function Index() {

  const trackers = useTrackerStore((state) => state.trackers);
  const sections = useSectionStore((state) => state.sectionsH);
  const addTrackerToSection = useSectionStore((state) => state.addTrackerToSection);

  const [sectionModalOpen, setSectionModalOpen] = useState(false);

  const [isModalVisible, setIsModalVisible] = useReactState(false);
  const [targetSection, setTargetSection] = useReactState<Section | null>(null);

  const router = useRouter();
  const { currentTheme } = useTheme(); // Get the current theme from context

  // Dynamic styles for square icon buttons
  const squareIconButtonStyle = (size: number) => ({
    ...styles.squareIconButton,
    backgroundColor: currentTheme["101010"],
    borderColor: currentTheme.dimgray,
    width: size,
    height: size,
  });

  const handlePlusPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTargetSection(null);
  };

  type CalendarMode = CalendarProps["mode"];
  const buttons: CalendarMode[] = ["Daily", "Weekly", "Monthly"];
  const [selected, setSelected] = useState<CalendarMode>("Daily");

  return (
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

      <ScrollView contentContainerStyle={styles.scrollView}>
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

        {/* START dynamic sections rendering */}
        {sections
          .filter((s) => s.timePeriod === selected)
          .sort((a, b) => a.position - b.position)
          .map((section) => (
            <View key={`${section.sectionTitle}-${section.timePeriod}`}>
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
                    style={squareIconButtonStyle(itemSize)}
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
                  style={squareIconButtonStyle(itemSize)}
                >
                  <AntDesign name="plus" size={30} color={currentTheme.white} />
                </Pressable>
              </View>
            </View>
          ))}
        {/* END dynamic sections rendering */}

        <Pressable //SECTION CREATION PRESSABLE Can change style it looks ugly
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
                      }

                      addTrackerToSection(
                        targetSection.sectionTitle,
                        targetSection.timePeriod,
                        tracker
                      );
                      handleCloseModal();
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
    marginBottom: 20,
    marginTop: 50,
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
    margin: spacing / 2,
  },
  sectionCreateButton: {
    padding: 12,
    width: '100%', //feel free to change
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

