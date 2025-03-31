import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, View, Button, SafeAreaView, Image, TextInput, Dimensions} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";


export default function newTrackerView() {
  
  const router = useRouter();
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
  const handleConfirm = () => {
    // Implement your confirm logic here
    console.log('Confirmed');
    // You can also navigate or perform other actions
  };

  const toggleButtonState = () => {
    // Toggle between "Goal" and "Limit" on press
    setIsGoal(prevState => !prevState);
  };

  var dropdownPresent = false;
  return (
    <View style={styles.overlay}>
      
      {/* Text Above Popup */}
      <Text style={styles.overlayText}>Create Tracker</Text>
      
      <SafeAreaView style={styles.container}>

        {/* Tracker Icon Option */}
        <Pressable onPress={() => console.log("Image Pressed")}
          style={styles.iconPressable}
          >

          <Image
            source={require("../assets/images/addImage.png")}
            style={styles.icon}
          />
        </Pressable>

        {/* Tracker Title */}
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="<Title>"
          placeholderTextColor="#aaa"
          value = {title}
          onChangeText={setTitle}
        />
        </View>

        {/* Limit of Tracker (OPTIONAL) */}
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Goal"
          placeholderTextColor="#aaa"
          keyboardType="numeric"  // Shows numeric keyboard
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
          setOpen={setOpen}
          setValue={setValue}
          setItems={setUnits}
          placeholder="Set Unit"
          placeholderStyle={{color: '#aaa'}}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          textStyle={styles.dropdownText}
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

        {/* Confirm Button (Only shows if title is not empty) */}
        {title.length > 0 && (
          <Pressable
           onPress={handleConfirm} 
           style={styles.confirmButton}>
            <Ionicons name="checkbox" size={30} color="#FFFFFF" />
          </Pressable>
        )}
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

const { width, height } = Dimensions.get('window');
const smallerWidth = (width * 0.8*0.85); //for some reason

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
    flex: 0.6,
    width: width*0.85,
    backgroundColor: "#101010",
    padding: 20,
    borderRadius: 15, // Rounded edges
    borderWidth: 1,
    borderColor: 'dimgray',
    alignItems: "center",
  },

  // Image button user can add
  icon: {
    marginTop: 30,
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  inputContainer: {
    width: smallerWidth,
    backgroundColor: "#101010",
    borderColor: "dimgray",
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft : 2,
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
    width: "50%",
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
    width: smallerWidth,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    zIndex: 1000, // Important for dropdown to appear above other elements
    alignSelf: 'center',
  },
  dropdown: {
    backgroundColor: '#101010',
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 34, //padding according to arrow size to center (for some reason 45 if central?)
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
  dropdownArrow: {
    width: 15,
    height: 15,
    tintColor: 'white', // This might work for some icon types
  },
  dropdownTick: {
    width: 15,
    height: 15,
    tintColor: 'white', // This might work for some icon types
  },
  // checkbox to confirm
  confirmButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
});