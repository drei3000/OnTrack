import { Modal, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "./ThemeContext";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconItem, isUri} from "./newTrackerView";
import { useState } from "react";
import { getImage } from "./trackerList";
import { Dimensions, PixelRatio } from "react-native";
import { View, Pressable,Image, Text , ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect } from "react";
import { TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { useTrackerStore } from "@/storage/store";
import { getIconInfo } from "@/types/Misc";
import { openDatabase } from "@/storage/sqlite";
import { TimePeriod, Tracker } from "@/types/Tracker";
import {setupDatabase} from "@/components/ZustandRefresh";

const height = Dimensions.get('window').height-1;
const width = Dimensions.get('window').width-1
const scale = PixelRatio.get(); //For exact pixel adjustments adjust according to scale

export default function editTracker(){
    /* handling of transitioning between newTrackerView and selectImage */
    const router = useRouter(); 
    const {trackerN,timeP, image, color} = useLocalSearchParams();
    const timePeriod = typeof(timeP) === "string" ? timeP : "Daily";
    const trackerName = typeof(trackerN) === "string" ? trackerN : "no_name";
    const {currentTheme} = useTheme();

    /*find tracker*/
    let tracker = useTrackerStore((state) =>
      state.getTracker(trackerName, timePeriod)
    );
    const addTracker = useTrackerStore((s) => s.addTracker2);
    /*states*/
    //input states
    const timePeriods = ['Daily','Weekly','Monthly','Yearly']
    const [currentTPIndex, setCurrentTPIndex] = useState(timePeriods.indexOf(timePeriod));
    const [isGoal, setIsGoal] = useState(true);
    const [title, setTitle] = useState(trackerName);
    const [currentAmount, setCurrentAmount] = useState('0');
    const [limit, setLimit] = useState('0');
    const [selectedImage, setSelectedImage] = useState(`${image ?? ''}`);
    const [selectedColor, setSelectedColor] = useState(`${color ?? ''}`);
    const [iconSize, setIconSize] = useState(0);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null); 

    useEffect(() => {
      if (!tracker) return;
    
      setTitle(tracker.trackerName);
      setCurrentAmount(`${tracker.currentAmount}`);
      setLimit(`${Math.abs(tracker.bound)}`);
      setIsGoal(tracker.bound > 0);
      setValue(tracker.unit || null);
    
      const [prefix, icon, color] = tracker.icon.split('|');
      if (prefix === 'image') {
        setSelectedImage(icon);
      } else {
        setSelectedImage(icon);
        setSelectedColor(color);
      }
    
      setCurrentTPIndex(timePeriods.indexOf(tracker.timePeriod));
    }, [tracker]);

        const [units, setUnits] = useState([
        { label: "NONE", value: ""},
        { label: "Kilograms", value: "kg" },
        { label: "Pounds", value: "lb" },
        { label: "Grams", value: "g" },
        { label: "Ounces", value: "oz" },
        { label: "Liters", value: "l" },
        { label: "Milliliters", value: "ml" },
        { label: "Gallons", value: "gal" },
        { label: "Cups", value: "cup" },
        { label: "Tablespoons", value: "tbsp" },
        { label: "Teaspoons", value: "tsp" },
        { label: "Meters", value: "m" },
        { label: "Centimeters", value: "cm" },
        { label: "Millimeters", value: "mm" },
        { label: "Inches", value: "in" },
        { label: "Feet", value: "ft" },
        { label: "Yards", value: "yd" },
        { label: "Miles", value: "mi" },
        { label: "Kilometers", value: "km" },
        { label: "Steps", value: "step" },
        { label: "Minutes", value: "min" },
        { label: "Hours", value: "hr" },
        { label: "Seconds", value: "sec" },
        { label: "Days", value: "day" },
        { label: "Weeks", value: "week" },
        { label: "Months", value: "month" },
        { label: "Calories", value: "kcal" },
        { label: "Kilojoules", value: "kj" },
        { label: "Heart Rate (BPM)", value: "bpm" },
    ]);
    /*Functions*/
   // When return from child, update state if image param is present
    useEffect(() => {
        if (image && typeof image === 'string') {//set selected image unless blank
        setSelectedImage(image);
        }else{
        setSelectedImage(''); 
        }

        if(color && typeof color === 'string'){
        setSelectedColor(color);
        }
    }, [image, color] );

    //When icon is pressed (for selection)
    const handleImagePressed = () => {
        router.push({
        pathname: './selectImage',
        params: {
            selectedImage: selectedImage, //pass current image
            selectedColor: selectedColor, //pass selected Color
        },
    });
    }

    // Toggle between "Goal" and "Limit" on press
    const toggleGoalButton = () => {
        setIsGoal(prevState => !prevState);
    };
    const styles = StyleSheet.create({
        // Content inside overlay (background, size etc)
        container: {
          height: '100%',
          width: '100%',
          backgroundColor: currentTheme["101010"],
          paddingHorizontal: 20,
          borderColor: currentTheme.dimgray,
          alignContent: 'center',
        },
        // Contains input fields
        inputContainer: {
          width: '90%',
          backgroundColor: currentTheme["101010"],
          borderColor: currentTheme.dimgray,
          marginBottom: 20,
          borderRadius: 5,
          borderWidth: 1,
          
          alignSelf: 'center',
        },
        // All input fields
        input: {
          height: 60,
          color: currentTheme["FFFFFF"],
          textAlign: "center",
          fontSize: 20,
        },
      
        // Dropdown styling
        dropdownContainer: {
            height: 60,
          width: '90%',
          marginBottom: 20,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: currentTheme.dimgray,
          zIndex: 1000, 
          alignSelf: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        },
        dropdown: {
          backgroundColor: currentTheme["101010"],
          borderColor: 'transparent',
        },
        dropdownList: {
          backgroundColor: currentTheme["101010"],
          borderColor: currentTheme.dimgray,
        },
        dropdownText: {
          color: currentTheme.white,
          textAlign: 'center',
          fontSize: 20,
        },
      
        tickContainerStyle: {
          marginLeft: -15,
        },
        arrowContainerStyle: {
          marginLeft: -15,
        },
        dropdownArrow: {
          width: 5*scale, //should probably adjust as no longer using screen size based rendering
          height: 5*scale,
          tintColor: currentTheme.white, //white arrow
        },
        dropdownTick: {
          width: 5*scale,
          height: 5*scale,
          tintColor: currentTheme.white, //white tick
        },
      
        //Contains buttons (important for row display)
        buttonsContainer: {
          height: 60,
          width: '90%',
          flexDirection: 'row',
          marginBottom: 20,
        },
        timePeriodButton: {
          height: '100%',
          flex: 1,
          backgroundColor: currentTheme.black,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: currentTheme.dimgray,
      
          alignItems: 'center',
          justifyContent: 'center',
        },
        goalLimitButton: {
          flex: 1,
          height: '100%',
      
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: currentTheme.black,
      
          borderRadius: 5,
          borderWidth: 2,
          borderColor: currentTheme.dimgray,
      
          fontSize: 20,
          fontWeight: "bold",
          color: currentTheme["FFFFFF"],
        },
      
        // Color of goalLimit button dependent on {goal or limit}
        goalButton: {
          backgroundColor: "#06402B",
        },
        limitButton: {
          backgroundColor: "#950606",
        },
      
        //Text if goal or limit {otherwise buttonText}
        goalLimitText: {
          fontSize: 20,
          fontWeight: "bold",
          color: currentTheme["FFFFFF"],
        },
        buttonText:{
          fontSize: 20,
          color: "dimgray" //dull display
        },
        confirmButton:{
            borderColor: currentTheme.dimgray,
            borderRadius: 5,
            borderWidth: 1,
            width: '70%',
            height: 60,

            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            backgroundColor: currentTheme.green,
        },
        confirmText:{
            color: currentTheme.white,
            fontWeight: '500',
            fontSize: 22,
            marginLeft: 5,
        }
        
      });
    //Cross, Icon box and tick (used in select image)
    const imageBoxStyles = StyleSheet.create({
    //For image cancellation, image and confirm tracker buttons
    imageButtonsContainer: {
        height: width*0.45,
        width: width * 0.45 + 160,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: currentTheme.white,
        position: 'relative',
    },
    crossButton: {
        position: 'absolute',
        left: 0,
        width: 80,
        height: '100%',

        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: currentTheme.dimgray,
        borderTopColor: '#101010',
        borderBottomColor: '#860B0B', 
        borderBottomWidth: 7,
        borderLeftColor: 'transparent',

        backgroundColor: '#a30a0a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        aspectRatio: 1,
        width: width * 0.45,
        
        borderColor: currentTheme.dimgray,
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',

        alignItems: 'center',
    },
    })

    const handleConfirmEdit = async () => {
      if (title.trim().length < 3) return;
    
      const iconString = isUri(selectedImage)
        ? `image|${selectedImage}`
        : `fa5|${selectedImage}|${selectedColor}`;
    
      const timePeriod: TimePeriod = ['Daily','Weekly','Monthly','Yearly'][currentTPIndex] as TimePeriod;
      const boundNumber: number = limit.trim() === '' ? 0 : parseFloat(limit) * (isGoal ? 1 : -1);
    
      try {
        const db = await openDatabase();
        
        await db.runAsync(
          `UPDATE trackers SET tracker_name = ?, icon = ?, time_period = ?, unit = ?, bound_amount = ?, last_modified = ?, current_amount = ? WHERE tracker_name = ? AND time_period = ?`,
          [title.trim(), iconString, timePeriod, value ?? null, boundNumber, Date.now(), currentAmount, trackerName, timePeriod]
        );
        
        setupDatabase();
        router.back();
      } catch (err) {
        console.error('Could not update tracker', err);
      }
    };

    //add margin at top equal to height - height of components
    var marginForTop = (height - ((60/scale)*6 + (20/scale)*6 + (width)*0.45)) / 2
    marginForTop = marginForTop < 0 ? 0 : ((marginForTop/scale)/2); //give up tonight dont pmo
    return(
     //entire area
    <SafeAreaView
    style = {[
        styles.container,
        {alignItems: 'center'}
    ]}>
        <View style = {[
            imageBoxStyles.imageButtonsContainer,
            {marginTop: marginForTop}]}>

        {/* Left cross button (render if image)*/}
        {selectedImage != "" && (
        <Pressable
        style={imageBoxStyles.crossButton}
        onPress={() => setSelectedImage("")}
        >
        <Ionicons name="close" size={24} color="white" />
        </Pressable>
        )}

        {/* Tracker Icon Option */}
        <Pressable 
        style = {imageBoxStyles.icon}
        onLayout={(event) => {
            const { height, } = event.nativeEvent.layout;
            setIconSize(height * 0.7);
        }}

        onPress={() => handleImagePressed()}
        > 
        {isUri(selectedImage) ? ( //use image if imageUri
        <Image
        source={{ uri: selectedImage }}
        style={{
            width: width*0.45-2,
            aspectRatio: 1,
        }}
        resizeMode="cover"
        />
        ) : selectedImage && iconSize > 0 && ( //otherwise if valid use icon
        <FontAwesome5 
            name={selectedImage as any}
            color = {selectedColor} 
            size = {iconSize}
            alignSelf = 'center'
            justifySelf = 'center'
            />
        )}
        </Pressable>
        </View>


        {/* Tracker Title */}
        <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Title(*)"
            placeholderTextColor="#aaa"
            maxLength={25} //titles should be brief
            value = {title}
            returnKeyType = "done"
            onChangeText={setTitle}
            onPressIn={() => setOpen(false)} //close dropdown
        />
        </View>

        {/* Tracker currentamount */}
        <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Current amount"
            placeholderTextColor="#aaa"
            value = {currentAmount}
            returnKeyType = "done"
            onChangeText={(text) => {
                //only allow numbers and a single decimal point 
                const cleanedText = text.replace(/[^0-9.]/g, '');
                const decimalCount = (cleanedText.match(/\./g) || []).length;
                if (decimalCount <= 1) {
                setCurrentAmount(cleanedText);
                }
            }}
            onPressIn={() => setOpen(false)} //close dropdown
        />
        </View>

        {/* Limit/Goal of Tracker (OPTIONAL) */}
        <View style={styles.inputContainer}>
        <TextInput
        style={[styles.input, {color: isGoal ? "#06402B" : "#950606"}]} //if goal text red otherwise green
        
        placeholder = {isGoal ? "Goal" : "Limit"}
        placeholderTextColor="#aaa"
        maxLength={10}
        keyboardType="numeric" 
        returnKeyType = "done" 
        onPressIn={() => setOpen(false)} //close dropdown
        onChangeText={(text) => {
            //only allow numbers and a single decimal point 
            const cleanedText = text.replace(/[^0-9.]/g, '');
            const decimalCount = (cleanedText.match(/\./g) || []).length;
            if (decimalCount <= 1) {
            setLimit(cleanedText);
            }
        }}
        value={limit}
        />
        </View>


        {/* Unit Dropdown <bugged for android> (OPTIONAL) */}
        <View style={[styles.dropdownContainer, { zIndex: 10 }]}>
        
        <DropDownPicker
            open={open}
            value={value}
            items={units}
            setOpen={setOpen}
            onOpen={() => Keyboard.dismiss()}
            setValue={setValue}
            setItems={setUnits}
            dropDownDirection="BOTTOM"
            autoScroll={true}
            placeholder="Set Unit"
            placeholderStyle={{ color: '#aaa' }}
            style={styles.dropdown}
            dropDownContainerStyle={[styles.dropdownList, { zIndex: 1000 }]}
            textStyle={styles.dropdownText}
            arrowIconContainerStyle={styles.arrowContainerStyle}
            tickIconContainerStyle={styles.tickContainerStyle}
            arrowIconStyle={styles.dropdownArrow}
            tickIconStyle={styles.dropdownTick}
            flatListProps={{
                nestedScrollEnabled: true,
            }}
        />
        </View>
        {/*View with time period + goal/limit buttons in*/}
        <View style = {styles.buttonsContainer}>

        {/* Time period pressable (cycles through time periods) */}
        <Pressable
        style = {styles.timePeriodButton}
        //NO ON PRESS CAPABILITY WOULD COMPLICATE SECTION_TRACKERS
        //onPress={() => (setCurrentTPIndex((currentTPIndex + 1) % timePeriods.length))}
        >
        <Text style = {{
            color: currentTheme["red"],
            fontSize: 20,
            fontWeight: 'bold',
        }}>
            {timePeriods[currentTPIndex]}(*)
        </Text>
        </Pressable>

        {/* Button to toggle between Goal and Limit */}
        <Pressable
        style={[
            styles.goalLimitButton,
            limit.length > 0 
            ? (isGoal ? styles.goalButton : styles.limitButton) //if {goal} then goal style else limit style
            : null, 
        ]}
        onPress={
            toggleGoalButton
        }
        >
        <Text style={limit.length > 0 ? styles.goalLimitText : styles.buttonText}> 
            {isGoal ? 'Goal' : 'Limit'}
        </Text>
        </Pressable>
        </View>



        {/* Right tick button, render if title > 2 (can be changed) */} 
        {title.length > 2 && (
        <Pressable style={styles.confirmButton} onPress={handleConfirmEdit}>
        <Ionicons name="checkmark-done" size={40} color="white" />
        <Text style = {styles.confirmText}> Confirm </Text>
        </Pressable>
        )}
    </SafeAreaView>
    );
}
