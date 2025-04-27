import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from './ThemeContext';
import { useAuth } from './LoginContext'; 

const width = Dimensions.get('window').width - 1;

export default function Profile() {
  const router = useRouter();
  const { currentTheme } = useTheme();  // Get the current theme from context
  const { user, logout } = useAuth();  // Get user and logout function from context

  const handleLogout = async () => {
    await logout();  // Call the logout function to log the user out
    setTimeout(() => {
      router.back(); // Navigate back after a tiny delay
    }, 100)  // Redirect to the home page
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme["rgba(0, 0, 0, 0.8)"], // Make the background transparent
      paddingHorizontal: 20,
      paddingVertical: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 18,
      color: currentTheme.white,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    profileInfoContainer: {
      width: width * 0.85,
      backgroundColor: currentTheme["101010"], // Solid background for profile section
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: currentTheme.dimgray,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    profileIcon: {
      width: 100,
      height: 100,
      borderRadius: 50, 
      marginBottom: 10,
    },
    usernameText: {
      color: currentTheme.lightblue,
      marginBottom: 10,
    },
    logoutButton: {
      marginTop: 20,
      backgroundColor: currentTheme["101010"],
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: currentTheme.dimgray,
    },
    logoutButtonText: {
      fontSize: 18,
      color: currentTheme.white,
      fontWeight: 'bold',
    },
    exitButton: {
        backgroundColor: currentTheme["101010"],
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: currentTheme.dimgray,
        marginTop: 30, // spacing between the profile and the button
      },
      exitButtonText: {
        fontSize: 18,
        color: currentTheme.white,
        fontWeight: 'bold',
      },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.profileInfoContainer}>
        {/* Display user information if logged in */}
        {user ? (
          <>
            <Text style={styles.usernameText}>Logged in as: {user.username}</Text>
            {/* Always show the default profile icon */}
            <MaterialCommunityIcons name="account" size={80} color={currentTheme.white} />
          </>
        ) : (
          <Text style={{ color: currentTheme.lightblue }}>You are not logged in.</Text>
        )}
        {/* Logout Button */}
        {user && (
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </Pressable>
        )}
      </View>

      <Pressable onPress={() => router.back()} style={styles.exitButton}>
        <Text style={styles.exitButtonText}>Exit</Text>
      </Pressable>
    </SafeAreaView>
  );
}