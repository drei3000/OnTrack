import { Text, View, Pressable, StyleSheet, ScrollView, SafeAreaView } from "react-native";
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
      flexGrow: 1, // Added to allow ScrollView to expand properly
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
      onPress: () => router.push("./accountSettings"),
    },
    
    {
      title: "Notifications",
      description: "Push Notification | Sound Preferences",
      icon: "bell",
      onPress: () => router.push("./notificationSettings"),
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
      onPress: () => router.push("./privacySettings"),
    },
    {
      title: "Tracker List",
      description: "See Trackers | Edit Trackers",
      icon: "rectangle",
      onPress: () => router.push("../../trackerList"),
    },
    {
      title: "Help & Support",
      description: "FAQs | Contact Support | Report Issue",
      icon: "help-circle",
      onPress: () => router.push("./helpSupport"),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme["101010"] }}>
      <View style={[styles.container]}>
        <Pressable style={styles.themeToggle} onPress={toggleTheme}>
          <MaterialCommunityIcons
            name={isDarkMode ? "weather-night" : "white-balance-sunny"}
            size={24}
            color={currentTheme.white}
          />
          <Text style={[styles.themeText, { color: currentTheme.white }]}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </Text>
        </Pressable>

        <ScrollView
          horizontal={false} 
          style={{ width: "100%" }} 
          contentContainerStyle={styles.settingsList} 
        >
          {settingsItems.map((item, index) => (
            <Pressable
              key={index}
              style={[styles.settingsItem, { backgroundColor: currentTheme["1E1E1E"] }]}
              onPress={item.onPress}
            >
              <MaterialCommunityIcons
                name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={24}
                color={currentTheme.white}
              />
              <View style={styles.settingsTextContainer}>
                <Text style={[styles.settingsTitle, { color: currentTheme.white }]}>{item.title}</Text>
                <Text style={[styles.settingsDescription, { color: currentTheme.gray }]}>
                  {item.description}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: currentTheme.white }]}>
            © 2025 OnTrack. All rights reserved.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}