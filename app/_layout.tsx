import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";
import { openDatabase } from "@/storage/sqlite";
import { useEffect } from "react";
import { ThemeProvider } from "./ThemeContext";

export default function Layout() {
  useEffect(() => { //runs on launch
    const setupDatabase = async () => { //function to copy and open database
      try{
        const db = await openDatabase();
        console.log("Database initialized");
      } catch (error) {
        console.error("Database error:",error);
      }
    };
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("transparent");
    setupDatabase();
  }, []);

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}> {/*Can be true, adds back button and title*/}
        {/*Will always be one of tabs present*/}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name ="Profile" options={{ presentation: "transparentModal", title: 'Profile'}} />
        {/* Makes transparent screen for tracker creation*/}
        <Stack.Screen name="newTrackerView" options={{ presentation: "transparentModal", title: "New Tracker" }} />
        {/* Makes transparent screen for image selection*/}
        <Stack.Screen name="selectImage" options={{ presentation: "transparentModal", title: "Select Image" }} />
      </Stack>
   </ThemeProvider>
  );
}
