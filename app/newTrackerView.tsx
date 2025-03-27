import React from 'react';
import { SafeAreaView, Text, TextInput, Button, View, StyleSheet, Image, Pressable} from 'react-native';


//View for a new tracker, regardless of section
export default function newTrackerView() {
    return (
      <SafeAreaView style={styles.container}>
      {/*pressable Icon*/}
      <Pressable onPress={() => console.log('Image Pressed')}>
        <Image 
          source={require('../assets/images/addImage.png')} 
          style={styles.icon} 
        />
      </Pressable>

      {/* Text Field below Icon */}
      <TextInput
        style={styles.input}
        placeholder="<Title>"
        placeholderTextColor="#aaa"
      />

      {/* Two Text Fields below */}
      <TextInput
        style={styles.input}
        placeholder="Limit"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Unit"
        placeholderTextColor="#aaa"
      />

      <Pressable onPress={() => console.log('GOAL Pressed')}
        style={styles.goalButton}>
         <Text style={styles.goalButtonText}>GOAL</Text>

      </Pressable>

      {/* Space for Back and Confirm Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => {}} color="#FF5722" />
        <Button title="Confirm" onPress={() => {}} color="#2196F3" />
      </View>

      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#101010',
      padding: 20,
    },
    icon: {
      marginTop: 30,
      width: 150,
      height: 150,
      marginBottom: 10,
    },
    input: {
      width: '80%',
      height: 100,
      backgroundColor: '#101010',
      borderColor: 'dimgray',
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 20,
      borderRadius: 5,
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
    },
    goalButton: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10,
      color: '#FFFFFF',
      backgroundColor: '#06402B',
      height: 50,

      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'dimgray',
    },
    goalButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF'
    }
  });