import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable, Dimensions, PixelRatio, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from './ThemeContext';    // Import the ThemeContext
import Index from './(tabs)';
// import bcrypt from 'bcryptjs';
import { supabase } from '../storage/supabase'; 


const width = Dimensions.get('window').width-1

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);    // toggle between login and create account
  const { currentTheme } = useTheme();                    // Get the current theme from context
  const [message, setMessage] = useState('');             // to send error or success messages  


  const handleLogin = async () => {     // async so 'await' works
    setMessage('');                     // reset message

    if (isCreating) {
      if (!email || !username || !password) {
        setMessage('Please fill in all fields.');
        return;
      }

      const { data: existingUser, error: fetchError } = await supabase.from('Users')    // fetches data from 'Users' where email matches user input
        .select('email')
        .eq('email', email);   
      
      console.log('existingUser:', existingUser);

      if (fetchError) {
        console.error(fetchError);    // logs error in console
        setMessage('Error checking for existing user.');
        return;
      }

      if (existingUser.length > 0) {    // .length because supabase returns empty array rather than null if no existing user
        setMessage('An account with this email already exists.');   
        return;
      }

      // add new user to table
      const { error: insertError } = await supabase.from('Users').insert([{ email, username, password }]);

      if (insertError) {
        console.error(insertError);
        setMessage('Error creating account.');
      } else {
        setMessage('Account created successfully!');
        setIsCreating(false);                         
        setUsername('');
        setEmail('');
        setPassword('');
      }

    } else {

      // login
      if (!email || !password) {
        setMessage('Please fill in all fields.');
        return;
      }

      const { data: users, error: loginError } = await supabase.from('Users')   // select all where username equals user input
        .select('*')
        .eq('email', email);   

      if (loginError) {
        console.error(loginError);
        setMessage('An error occurred during login.');
        return;
      }

      if (users.length > 0 && password === users[0].password) {   // must use indexing as supabase returns array
        setMessage('Logged in successfully!');                    // === is strict equality (types must match aswell)
        router.back();
      } else {
        setMessage('Incorrect username or password.')
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
           
           {isCreating && (
             <TextInput
               style={styles.input}
               placeholder="Username"
               placeholderTextColor={currentTheme.gray}
               value={username}
               onChangeText={setUsername}
             />
           )}

           <TextInput
             style={styles.input}
             placeholder="Email"
             placeholderTextColor={currentTheme.gray}
             value={email}
             onChangeText={setEmail}
             keyboardType="email-address"
             autoCapitalize="none"
           />

           <TextInput
             style={styles.input}
             placeholder="Password"
             placeholderTextColor={currentTheme.gray}
             value={password}
             secureTextEntry
             onChangeText={setPassword}
           />

           {message !== '' && (
              <Text style={{ color: currentTheme.lightblue, marginTop: 5 }}>
                {message}
              </Text>
           )}

           <Pressable onPress={handleLogin} style={styles.exitButton}>
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




  
