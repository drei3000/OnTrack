import { Text, View, Pressable, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { useRouter } from "expo-router";

export default function Index() {
  const { isDarkMode, toggleTheme, currentTheme } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 16,
      paddingTop: 40,
    },
    themeToggle: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    themeText: {
      fontSize: 18,
      marginLeft: 10,
    },
    settingsList: {
      width: "100%",
    },
    settingsItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 10,
    },
    settingsTextContainer: {
      marginLeft: 10,
    },
    settingsTitle: {
      fontSize: 18,
    },
    settingsDescription: {
      fontSize: 14,
      color: "#888",
    },
    footer: {
      width: "100%",
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      borderTopWidth: 1,
      borderTopColor: "#ccc",
      marginTop: 10,
    },
    footerText: {
      fontSize: 14,
    },
  });

  const settingsItems = [
    {
      title: "Account",
      description: "Profile | Email | Password | Login",
      icon: "account",
      onPress: () => router.push("/accountSettings"),
    },
    {
      title: "Language",
      description: "Select App Language",
      icon: "translate",
      onPress: () => console.log("Open Language Selection Modal"),
    },
    {
      title: "Notifications",
      description: "Push Notification | Sound Preferences",
      icon: "bell",
      onPress: () => router.push("/notificationSettings"),
    },
    {
      title: "Backup & Restore",
      description: "Cloud Sync | Export Trackers",
      icon: "cloud-upload",
      onPress: () => console.log("Starting backup..."),
    },
    {
      title: "Privacy & Security",
      description: "App Permissions | Data Encryption | Biometrics",
      icon: "shield-lock",
      onPress: () => router.push("/privacySettings"),
    },
    {
      title: "Help & Support",
      description: "FAQs | Contact Support | Report Issue",
      icon: "help-circle",
      onPress: () => router.push("/helpSupport"),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <Pressable style={styles.themeToggle} onPress={toggleTheme}>
        <MaterialCommunityIcons
          name={isDarkMode ? "weather-night" : "white-balance-sunny"}
          size={24}
          color={currentTheme.textColor}
        />
        <Text style={[styles.themeText, { color: currentTheme.textColor }]}>
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.settingsList}>
        {settingsItems.map((item, index) => (
          <Pressable
            key={index}
            style={[styles.settingsItem, { backgroundColor: currentTheme.cardBackgroundColor }]}
            onPress={item.onPress}
          >
            <MaterialCommunityIcons
              name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              size={24}
              color={currentTheme.textColor}
            />
            <View style={styles.settingsTextContainer}>
              <Text style={[styles.settingsTitle, { color: currentTheme.textColor }]}>{item.title}</Text>
              <Text style={[styles.settingsDescription, { color: currentTheme.secondaryTextColor }]}>
                {item.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: currentTheme.secondaryTextColor }]}>
          © 2025 OnTrack. All rights reserved.
        </Text>
      </View>
    </View>
  );
}