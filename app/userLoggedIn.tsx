import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from './ThemeContext';  // Import the ThemeContext
import { useAuth } from './LoginContext';  // Import the LoginContext
import { CommonStyles } from './CommonStyles';

const width = Dimensions.get('window').width - 1;

export default function Profile() {
  const router = useRouter();
  const { currentTheme } = useTheme();  // Get the current theme from context
  const { user, logout } = useAuth();  // Get user and logout function from context
  const commonStyles = CommonStyles();

  const handleLogout = async () => {
    await logout();  // Call the logout function to log the user out
    router.push("/");  // Redirect to the home page (or another page of your choice)
  };

  return (
    <View style={commonStyles.overlay}>
      <Text style={commonStyles.header}>Profile</Text>

      <SafeAreaView style={[commonStyles.container,{paddingVertical: 500 as const,}]}>
        {/* Display user information if logged in */}
        {user ? (
          <>
            <Text style={commonStyles.blueText}>Logged in as: {user.username}</Text>
            {/* Always show the default profile icon */}
            <MaterialCommunityIcons name="account" size={80} color={currentTheme.white} />
          </>
        ) : (
          <Text style={{ color: currentTheme.lightblue }}>You are not logged in.</Text>
        )}

        {/* Logout Button */}
        {user && (
          <Pressable onPress={handleLogout} style={commonStyles.button}>
            <Text style={commonStyles.buttonText}>Log Out</Text>
          </Pressable>
        )}
      </SafeAreaView>

      <Pressable onPress={() => router.back()} style={commonStyles.button}>
        <Text style={commonStyles.buttonText}>Exit</Text>
      </Pressable>
    </View>
  );
}