import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable, Dimensions, PixelRatio, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);    //toggle between login and create account

  const handleSubmit = () => {
    if (isCreating) {
      // Account creation logic goes here
      if (!email || !username || !password) {
        alert('Please fill in all fields.');
      } else {
        alert('Account Created!');
      }
    } else {
      // Login logic goes here
      if (!username || !password) {
        alert('Please fill in all fields.');
      } else {
        alert('Logged In!');
      }
    }
  };

  return (
     <View style={styles.overlay}>
       
         {/* Header above modal */}
         <Text style={styles.header}>Profile</Text>

         {/* Modal box */}
         <SafeAreaView style={styles.container}>

           <MaterialCommunityIcons name="account" size={80} color="white" />

           <TextInput
             style={styles.input}
             placeholder="Username"
             placeholderTextColor={"gray"}
             value={username}
             onChangeText={setUsername}
           />

           {isCreating && (
             <TextInput
               style={styles.input}
               placeholder="Email"
               placeholderTextColor="gray"
               value={email}
               onChangeText={setEmail}
               keyboardType="email-address"
               autoCapitalize="none"
             />
           )}

           <TextInput
             style={styles.input}
             placeholder="Password"
             placeholderTextColor={"gray"}
             value={password}
             secureTextEntry
             onChangeText={setPassword}
           />

           <Pressable onPress={handleSubmit} style={styles.exitButton}>
             <Text style={styles.exitButtonText}>
               {isCreating ? 'Create Account' : 'Log In'}
             </Text>
           </Pressable>

           <Pressable onPress={() => alert('Forgot Password button pressed')} style={styles.toggleText}>
             <Text style={styles.toggleText}>Forgot your password?</Text>
           </Pressable>

           <Pressable onPress={() => setIsCreating(!isCreating)}>
             <Text style={styles.toggleText}>
                {isCreating ? 'Already have an account? Log In' : 'Don\'t have an account? Create one'}
             </Text>
           </Pressable>
         </SafeAreaView>

         {/* Exit button below modal */}
         <Pressable onPress={() => router.back()} style={styles.exitButton}>
            <Text style={styles.exitButtonText}>Exit</Text>
         </Pressable>
     </View>
  );
}

const width = Dimensions.get('window').width-1

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    container: {
      //height: 370,
      width: width*0.85,
      backgroundColor: "#101010",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 15, 
      borderWidth: 1,
      borderColor: 'dimgray',
      alignItems: "center",
      justifyContent: "flex-start",
    },
  
    header: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10, 
    },
  
    input: {
      width: '82%',
      padding: 12,
      marginTop: 14,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ddd',
      color: 'white',
    },
  
    toggleText: {
      color: 'lightblue',
      marginTop: 16,
    },
  
    exitButton: {
      marginTop: 20,
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

    profileIcon: {
      width: 100,
      height: 100,
      borderRadius: 50, 
      marginBottom: 10,
      marginTop: 10,
    },
});
  
