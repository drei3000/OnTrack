import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    alert('Password changed successfully!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter current password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.buttonContainer}>
        <Button title="Change Password" onPress={handleChangePassword} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 6,
      marginTop: 12,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
    },
    buttonContainer: {
      marginTop: 30,
    },
  });