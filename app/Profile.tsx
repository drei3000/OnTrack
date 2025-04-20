import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable, Dimensions, PixelRatio, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from './ThemeContext'; // Import the ThemeContext
import Index from './(tabs)';

const width = Dimensions.get('window').width-1

type User = {
  username: string;
  email: string;
  password: string;
}

const mockDatabase: User[] = []; //Array to act as database to test

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);    //toggle between login and create account
  const { currentTheme } = useTheme(); // Get the current theme from context
  const [message, setMessage] = useState(''); //to send error or success messages  


  const handleSubmit = () => {
    setMessage(''); //reset message

    if (isCreating) {
      if (!email || !username || !password) {
        setMessage('Please fill in all fields.');
        return;
      }

      const userExists = mockDatabase.some(    // .some() returns true or false depending whether user object satisfies provided conditions
        (user) => user.username === username || user.email === email //=== (stict equality - types must match aswell as content), == (loose equality)
      );

      if (userExists) {
        setMessage('An account with this username or email already exists.');
        return;
      }

      mockDatabase.push({ username, email, password }); //adds new user object to end of array
      setMessage('Account created successfully!');
      setIsCreating(false);
      setUsername('');
      setEmail('');
      setPassword('');

    } else {
      //login
      if (!username || !password) {
        setMessage('Please fill in all fields.');
        return;
      }

      const user = mockDatabase.find(    //returns first user object it finds that matches the conditions
        (user) => user.username === username && user.password === password
      );

      if (user) {
        setMessage('Logged in successfully!');
        router.push('/(tabs)');

      } else {   //.find() will return undefined if it cannot find user    
        setMessage('Incorrect username or password.');
      }
    }
  };

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme["rgba(0, 0, 0, 0.8)"], // Use theme background color
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    container: {
      //height: 370,
      width: width*0.85,
      backgroundColor: currentTheme["101010"], // Use theme background color
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 15, 
      borderWidth: 1,
      borderColor: currentTheme.dimgray,
      alignItems: "center",
      justifyContent: "flex-start",
    },
  
    header: {
      fontSize: 18,
      color: currentTheme.white,
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
      borderColor: currentTheme.dimgray,
      color: currentTheme.white,
    },
  
    toggleText: {
      color: currentTheme.lightblue,
      marginTop: 5,
      marginBottom: 5,
    },
  
    exitButton: {
      marginTop: 20,
      backgroundColor: currentTheme["101010"],
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: currentTheme.dimgray,
    },
  
    exitButtonText: {
      fontSize: 18,
      color: currentTheme.white,
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

  return (
     <View style={styles.overlay}>
       
         {/* Header above modal */}
         <Text style={styles.header}>Profile</Text>

         {/* Modal box */}
         <SafeAreaView style={styles.container}>

           <MaterialCommunityIcons name="account" size={80} color={currentTheme.white} />

           <TextInput
             style={styles.input}
             placeholder="Username"
             placeholderTextColor={currentTheme.gray}
             value={username}
             onChangeText={setUsername}
           />

           {isCreating && (
             <TextInput
               style={styles.input}
               placeholder="Email"
               placeholderTextColor={currentTheme.gray}
               value={email}
               onChangeText={setEmail}
               keyboardType="email-address"
               autoCapitalize="none"
             />
           )}

           <TextInput
             style={styles.input}
             placeholder="Password"
             placeholderTextColor={currentTheme.gray}
             value={password}
             secureTextEntry
             onChangeText={setPassword}
           />

           {message !== '' && (
              <Text style={{ color: currentTheme.lightblue }}>
                {message}
              </Text>
           )}

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




  
