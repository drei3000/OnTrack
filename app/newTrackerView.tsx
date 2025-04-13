import React, { useEffect, useState, useCallback } from 'react';
import { Keyboard, Text, StyleSheet, Pressable, View, Button, SafeAreaView, Image, TextInput, Dimensions} from 'react-native';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { PixelRatio } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


//check if is a uri
export const isUri = (value: string): boolean => {
  return (
    typeof value === 'string' &&
    (value.startsWith('http') || value.startsWith('file://') || value.startsWith('data:image/'))
  );
};

//iconsToChoose data type
export type IconItem = { 
  name: string;
  type: string; //what icon is a part of (fa5 as of right now)
};

export default function newTrackerView() {
  const router = useRouter(); 
  const { image, color } = useLocalSearchParams(); // receives param from child

  
  //states
  const timePeriods = ['Daily','Weekly','Monthly','Yearly']
  const [currentTPIndex, setCurrentTPIndex] = useState(0); //TimePeriod button
  const [isGoal, setIsGoal] = useState(true); 
  const [title, setTitle] = useState(''); 
  const [limit, setLimit] = useState('');
  const [selectedImage, setSelectedImage] = useState("");
  const [iconSize, setIconSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#ffffff')

   // When return from child, update state if image param is present
   useEffect(() => {
    if (image && typeof image === 'string') {
      setSelectedImage(image);
    }else{
      setSelectedImage('');
    }
    
    if(color && typeof color === 'string'){
      setSelectedColor(color);
    }
  }, [image, color] );

  
  

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

  const handleImagePressed = () => {
    router.push({
      pathname: './selectImage',
      params: {
        selectedImage: selectedImage, //pass current image
        selectedColor: selectedColor, //pass selected Color
    },
  });
  }

  const toggleGoalButton = () => {
    // Toggle between "Goal" and "Limit" on press
    setIsGoal(prevState => !prevState);
  };
  
  return (
    
    <View style={styles.overlay}>

      {/* Text Above Popup */}
      <Text style={styles.overlayText}>Create Tracker</Text>
      
      <SafeAreaView style={styles.container}>
        <View style = {imageBoxStyles.imageButtonsContainer}>

        {/* Left cross button*/}
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
            width: 98,
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

        {/* Right tick button, render if title > 2 */}
        {title.length > 2 && (
        <Pressable style={imageBoxStyles.tickButton}>
          <Ionicons name="checkmark" size={24} color="white" />
        </Pressable>
        )}
        </View>


        {/* Tracker Title */}
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title(*)"
          placeholderTextColor="#aaa"
          maxLength={25} //titles should be brief
          value = {title}
          returnKeyType = "done" //allows done button
          onChangeText={setTitle}
          onPressIn={() => setOpen(false)} //close dropdown
        />
        </View>

        {/* Limit/Goal of Tracker (OPTIONAL) */}
        <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {color: isGoal ? "#06402B" : "#950606"}]}
          
          placeholder = {isGoal ? "Goal" : "Limit"}
          placeholderTextColor="#aaa"
          
          maxLength={10}
          keyboardType="numeric" 
          returnKeyType = "done" 
          onPressIn={() => setOpen(false)} //close dropdown
          onChangeText={(text) => {
            //only allow numbers and decimal point
            const cleanedText = text.replace(/[^0-9.]/g, '');
            //only one decimal point
            const decimalCount = (cleanedText.match(/\./g) || []).length;
            if (decimalCount <= 1) {
              setLimit(cleanedText);
            }
          }}
          value={limit}
        />
        </View>

      
        {/* Unit Dropdown (OPTIONAL) */}
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
      <View style = {styles.buttonsContainer}>
      {/* Time period pressable */}
      <Pressable
        style = {styles.timePeriodButton}
        onPress={() => (setCurrentTPIndex((currentTPIndex + 1) % timePeriods.length))}
      >
        <Text style = {{
          color: '#FFFFFF',
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
            ? (isGoal ? styles.goalButton : styles.limitButton) 
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

export const imageBoxStyles = StyleSheet.create({
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
    borderTopColor: '#101010',
    borderBottomColor: '#094F23',
    borderBottomWidth: 7,
    backgroundColor: '#075F28',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButton: {
    width: 60,
    height: '100%',

    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: 'dimgray',
    borderTopColor: '#101010',

    borderBottomColor: '#860B0B', 
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    backgroundColor: '#a30a0a',
    alignItems: 'center',
    justifyContent: 'center',
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
})
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
    height: 410,
    width: width*0.85,
    backgroundColor: "#101010",
    paddingHorizontal: 20,
    borderRadius: 15, // Rounded edges
    borderWidth: 1,
    borderColor: 'dimgray',
    alignItems: "center",
  },

  inputContainer: {
    width: width*0.85*0.8,
    backgroundColor: "#101010",
    borderColor: "dimgray",
    marginBottom: 5,
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

  //container for both
  buttonsContainer: {
    height: 50,
    width: width * 0.85 * 0.8,
    flexDirection: 'row',
  },

  timePeriodButton: {
    height: '100%',
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "dimgray",

    alignItems: 'center',
    justifyContent: 'center',
  },

  

  //goalLimit button
  goalLimitButton: {
    flex: 1,
    height: '100%',

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",

    borderRadius: 5,
    borderWidth: 2,
    borderColor: "dimgray",

    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  // Goal and Limit button styles
  goalButton: {
    backgroundColor: "#06402B",
  },
  limitButton: {
    backgroundColor: "#950606",
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