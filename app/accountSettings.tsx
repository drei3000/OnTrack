import React from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useTheme } from "./ThemeContext";

export default function AccountSettings() {
  const { currentTheme } = useTheme();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => console.log("Account deleted") },
      ]
    );
  };

  const handleChangeEmail = () => {
    console.log("Navigate to Change Email screen");
    // Add navigation or logic for changing email
  };

  const handleChangePassword = () => {
    console.log("Navigate to Change Password screen");
    // Add navigation or logic for changing password
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <Text style={[styles.header, { color: currentTheme.textColor }]}>Account Settings</Text>

      <Pressable style={[styles.button, { backgroundColor: currentTheme.cardBackgroundColor }]} onPress={handleChangeEmail}>
        <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>Change Email</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: currentTheme.cardBackgroundColor }]} onPress={handleChangePassword}>
        <Text style={[styles.buttonText, { color: currentTheme.textColor }]}>Change Password</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDeleteAccount}>
        <Text style={[styles.buttonText, { color: "white" }]}>Delete Account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
  },
});