import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { ThemeProvider } from "./ThemeContext";
import { setupDatabase } from "@/components/ZustandRefresh";

export default function Layout() {
  useEffect(() => { //runs on launch
    setupDatabase();
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("transparent");
    
  });


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
