import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable, Dimensions, PixelRatio } from 'react-native';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);    //toggle between login and create account

  const handleSubmit = () => {
    if (isCreating) {
      //account creation logic goes here
      alert('Account Created!');
    } else {
      //login logic goes here
      alert('Logged In!');
    }
  };

  return (
     <View style={styles.overlay}>
       
         {/* Header above modal */}
         <Text style={styles.header}>{isCreating ? 'Create Account' : 'Log In'}</Text>

         {/* Modal box */}
         <SafeAreaView style={styles.modalContainer}>
            <TextInput
             style={styles.input}
             placeholder="Email"
             placeholderTextColor={"gray"}
             value={email}
             onChangeText={setEmail}
            />
            <TextInput
             style={styles.input}
             placeholder="Password"
             placeholderTextColor={"gray"}
             value={password}
             secureTextEntry
             onChangeText={setPassword}
           />

           <Button title={isCreating ? 'Create Account' : 'Log In'} onPress={handleSubmit} />

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



const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      paddingHorizontal: 20,
    },
  
    modalContainer: {
      width: Dimensions.get('window').width * 0.85,
      backgroundColor: '#101010',
      paddingVertical: 24,
      paddingHorizontal: 20,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'dimgray',
      alignItems: 'center',
    },
  
    header: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 24, 
    },
  
    input: {
      width: '100%',
      padding: 12,
      marginBottom: 14,
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
      marginTop: 30,
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
});
  
