import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";
import { openDatabase } from "@/storage/sqlite";
import { useEffect } from "react";
import { ThemeProvider } from "./ThemeContext";
import { useSectionStore, useTrackerStore } from "@/storage/store";
import { exampleTrackers, TimePeriod, Tracker } from "@/types/Tracker";
import { Section } from "@/types/Section";
import { setupDatabase } from "@/components/ZustandRefresh";

export default function Layout() {
  //import methods
  const setTrackers = useTrackerStore((s) => s.setTrackers);
  const addTracker = useTrackerStore((s) => s.addTracker2);
  const getTracker = useTrackerStore((s) => s.getTracker);
  const setSectionsH= useSectionStore((s) => s.setSectionsH);
  const addSectionH = useSectionStore((s) => s.addSectionH);
  const initialAddTrackerToSection = useSectionStore((s) => s.initialAddTrackerToSection);
  //types
  type SectionRow = {
    section_id: number;
    section_title: string;
    time_period: TimePeriod;
    position: number;
    last_modified: number;
  };

  type TrackerRow = {
    tracker_id: number;
    tracker_name: string;
    icon: string;
    time_period: TimePeriod;
    last_modified: number;
    bound_amount: number;
    unit?: string;
    current_amount?: number;
  };

  type SectionTrackerRelation = {
    section_id: number,
    tracker_id: number,
    tracker_position: number,
  }
  
  useEffect(() => { //runs on launch
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("transparent");
    setupDatabase();
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
