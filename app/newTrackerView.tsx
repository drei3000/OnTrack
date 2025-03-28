import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, View, Button, SafeAreaView, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

export default function newTrackerView() {
  const router = useRouter();
  const [isGoal, setIsGoal] = useState(true);  // To toggle between "Goal" and "Limit"
  const [title, setTitle] = useState(''); // Track the title input

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
        <TextInput
          style={styles.input}
          placeholder="<Title>"
          placeholderTextColor="#aaa"
          value = {title}
          onChangeText={setTitle}
        />

        {/* Limit of Tracker (OPTIONAL) */}
        <TextInput
          style={styles.input}
          placeholder="Limit"
          placeholderTextColor="#aaa"
        />

        {/* Unit of Tracker (OPTIONAL) */}
        <TextInput
          style={styles.input}
          placeholder="Unit"
          placeholderTextColor="#aaa"
        />

        {/* Button to toggle between Goal and Limit */}
          <Pressable
            style={[styles.button, isGoal ? styles.goalButton : styles.limitButton]}
            onPress={toggleButtonState}
          >
            <Text style={styles.goalLimitText}>{isGoal ? 'Goal' : 'Limit'}</Text>
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

      {/* Exit Button (placed below the modal content) */}
      <Pressable
       onPress={() => router.back()}
       style={styles.exitButton}
      >
          <Text style={styles.exitButtonText}>Exit</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({

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
    width: "85%",
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

  // All input fields
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#101010",
    borderColor: "dimgray",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },

  // Goal and Limit button styles
  goalButton: {
    backgroundColor: "#06402B",
  },
  limitButton: {
    backgroundColor: "#950606",
  },

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
  goalLimitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  // Exit Button (at the bottom of the modal)
  exitButton: {
    marginTop: 20, // Adds some space above the button
    backgroundColor: '#101010',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'dimgray',
  },

  exitButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

  // Confirm Button (icon for confirmation)
  confirmButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
});
