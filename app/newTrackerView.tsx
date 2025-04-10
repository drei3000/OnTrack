import React, { useState } from 'react';
import { Keyboard, Text, StyleSheet, Pressable, View, Button, SafeAreaView, Image, TextInput, Dimensions} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { PixelRatio } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function newTrackerView() {
  const router = useRouter(); 

  //states
  const [isGoal, setIsGoal] = useState(true); 
  const [title, setTitle] = useState(''); 
  const [limit, setLimit] = useState('');


  // Dropdown state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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

  // Confirm action when icon is pressed
  //TO DO: Create tracker and exit in this function given state variables
  const handleConfirm = () => {
    console.log('Confirmed');

  };

  const toggleButtonState = () => {
    // Toggle between "Goal" and "Limit" on press
    setIsGoal(prevState => !prevState);
  };

  const [iconSize, setIconSize] = useState(0);
    
  return (
    
    <View style={styles.overlay}>
      
      
      {/* Text Above Popup */}
      <Text style={styles.overlayText}>Create Tracker</Text>
      
      <SafeAreaView style={styles.container}>
        <View style = {styles.imageButtonsContainer}>

        {/* Left cross button*/}
        <Pressable style={styles.crossButton}>
          <Ionicons name="close" size={24} color="white" />
        </Pressable>

        {/* Tracker Icon Option */}
        <Pressable 
          style = {styles.icon}
          onPress={() => router.push('./selectImage')}
        > 
          <Ionicons
            name={'add'} //unsure about this
            color="dimgray" 
            size = {50}
            alignSelf = 'center'
            justifySelf = 'center'
            ></Ionicons>
        </Pressable>

        {/* Right tick button */}
        {title.length > 2 && (
        <Pressable style={styles.tickButton}>
          <Ionicons name="checkmark" size={24} color="white" />
        </Pressable>
        )}
        </View>


        {/* Tracker Title */}
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#aaa"
          maxLength={25} //titles should be brief
          value = {title}
          returnKeyType = "done" //allows done button
          onChangeText={setTitle}
          onPressIn={() => setOpen(false)} //close dropdown
        />
        </View>

        {/* Limit of Tracker (OPTIONAL) */}
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Goal"
          placeholderTextColor="#aaa"
          maxLength={10}
          keyboardType="numeric"  // Shows numeric keyboard
          returnKeyType = "done" 
          onPressIn={() => setOpen(false)} //close dropdown
          onChangeText={(text) => {
            // Only allow numbers and decimal point
            const cleanedText = text.replace(/[^0-9.]/g, '');
            // Ensure only one decimal point
            const decimalCount = (cleanedText.match(/\./g) || []).length;
            if (decimalCount <= 1) {
              setLimit(cleanedText);
            }
          }}
          value={limit}
        />
        </View>

      
        {/* Unit Dropdown */}
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={units} //List of items is the list of units
          setOpen = {setOpen}
          onOpen={() => Keyboard.dismiss()}
          setValue={setValue}
          setItems={setUnits}
          autoScroll = {true}
          placeholder="Set Unit"
          placeholderStyle={{color: '#aaa'}}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          textStyle={styles.dropdownText}
          arrowIconContainerStyle = {styles.arrowContainerStyle}
          tickIconContainerStyle = {styles.tickContainerStyle}
          arrowIconStyle = {styles.dropdownArrow}
          tickIconStyle = {styles.dropdownTick}
        />
      </View>

        {/* Button to toggle between Goal and Limit */}
        <Pressable
          style={[
            styles.button,
            limit.length > 0 ? (isGoal ? styles.goalButton : styles.limitButton) : null,
          ]}
          onPress={toggleButtonState}
        >
          <Text style={limit.length > 0 ? styles.goalLimitText : styles.buttonText}>
            {isGoal ? 'Goal' : 'Limit'}
          </Text>
        </Pressable>
      </SafeAreaView>

    
      {/* Exit Button (placed below the content) */}
      <Pressable
       onPress={() => {open ? null : router.back()}}
       style={open ? styles.exitButtonInvisible : styles.exitButton} //if dropdown open invisible
      >
        <Text style={open ? styles.exitButtonTextInvisible : styles.exitButtonText}>
          Exit
        </Text>
      </Pressable>
    </View>
  );
}

const width = Dimensions.get('window').width-1
const height = Dimensions.get('window').height-1

const scale = PixelRatio.get(); //For exact pixel adjustments adjust according to scale

const styles = StyleSheet.create({
  //Fixes weird bug to do with text wrapping in container?
  iconPressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text above popup
  overlayText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },

  // Overlay itself
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // 0.8 opacity of darkness
    justifyContent: "center",

    // Stretch to fill center
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Content inside overlay (background, size etc)
  container: {
    //flex: 0.6,
   //height: height*0.52, //Maybe adjust is a tad manual
    height: 440,
    width: width*0.85,
    backgroundColor: "#101010",
    paddingHorizontal: 20,
    borderRadius: 15, // Rounded edges
    borderWidth: 1,
    borderColor: 'dimgray',
    alignItems: "center",
  },

  //For image cancellation, image and confirm tracker buttons
  imageButtonsContainer: {
    height: 100,
    width: 220,
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  tickButton: {
    //flex: 3,
    width: 60,
    height: '100%',

    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: 'dimgray',
    borderRightColor: 'transparent',
    borderTopColor: '#06402B',
    //borderTopRightRadius: 5,
    borderBottomColor: '#094F23',
    borderBottomWidth: 7,
    backgroundColor: '#075F28',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButton: {
    //flex: 3,
    width: 60,
    height: '100%',

    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: 'dimgray',
    borderTopColor: '#490016',
    borderBottomColor: '#400215', //85% opacity (probably not even relevant)
    borderLeftColor: 'transparent',
    backgroundColor: '#490016',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //UGLY -> TO BE REMOVED
  crossFade: {
    position: 'absolute',
    width: 12,
    height: 100,
    zIndex: 1,
    
    right: -1,
    top: -1,
    bottom: +1,
  },
  
  // Image button user can add
  icon: {
    //flex: 5,
    width: 100,
    height: '100%',
    borderColor: 'dimgray',
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },

  inputContainer: {
    width: width*0.85*0.8,
    backgroundColor: "#101010",
    borderColor: "dimgray",
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    
    alignSelf: 'center',
  },

  // All input fields
  input: {
    height: 50,
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
    //paddingLeft: 10,
  },

  // Goal and Limit button styles
  goalButton: {
    backgroundColor: "#06402B",
  },
  limitButton: {
    backgroundColor: "#950606",
  },

  //Button if neither goal nor limit
  button: {
    width: width*0.85*0.5, //button half of the container
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "dimgray",
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "dimgray",
  },
  //Text if goal or limit
  goalLimitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  buttonText:{
    fontSize: 20,
    color: "dimgray" //blend in and be invisible
  },

  // Exit Button (below the modal)
  exitButton: {
    marginTop: 20, // Adds some space above the button
    backgroundColor: '#101010',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'dimgray',
  },
  // Exit Button (below the modal)
  exitButtonInvisible: {
    marginTop: 20, // Adds some space above the button
    backgroundColor: '#transparent',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  exitButtonTextInvisible:{
    fontSize: 18,
    color: 'transparent',
    fontWeight: 'bold',
  },
  exitButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    width: width*0.8*0.85,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'dimgray',
    zIndex: 1000, // Important for dropdown to appear above other elements
    alignSelf: 'center',
    alignContent: 'center',
  },
  dropdown: {
    backgroundColor: '#101010',
    borderColor: 'transparent',
  },
  dropdownList: {
    backgroundColor: '#101010',
    borderColor: 'dimgray',
  },
  dropdownText: {
    color: 'white',
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
    width: 5*scale,
    height: 5*scale,
    tintColor: 'white', // This might work for some icon types
  },
  dropdownTick: {
    width: 5*scale,
    height: 5*scale,
    tintColor: 'white', // This might work for some icon types
  },

  
});