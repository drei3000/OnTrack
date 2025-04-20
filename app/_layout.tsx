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

export default function Layout() {
  //import methods
  const setTrackers = useTrackerStore((s) => s.setTrackers);
  const addTracker = useTrackerStore((s) => s.addTracker);
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
    const setupDatabase = async () => { //function to copy and open database
      try{
        const db = await openDatabase();1
        console.log("Database initialized");

        //Querying
        //ALL trackers
        const trackersInfo: TrackerRow[] = await db.getAllAsync<TrackerRow>("SELECT tracker_id,tracker_name,icon,time_period,unit,bound_amount,current_amount,last_modified FROM trackers");
        const sectionsInfo: SectionRow[] = await db.getAllAsync<SectionRow>("SELECT section_id,section_title,time_period,position,last_modified FROM sections");
        const sectionTrackersInfo: SectionTrackerRelation[] = await db.getAllAsync<SectionTrackerRelation>("SELECT section_id,tracker_id,tracker_position FROM section_trackers");

        //initializing all trackers first
        // write to Zustand
        const trackers : TrackerRow[] = trackersInfo.map(tracker => { //const mapped for referencing later
          const newTracker = new Tracker(
            tracker.tracker_name,
            tracker.icon,
            tracker.time_period,
            tracker.last_modified,
            tracker.bound_amount,
            tracker.unit,
            tracker.current_amount ? tracker.current_amount : 0 //shouldnt be undefined
          );
          addTracker(newTracker);
          return tracker;
        });

        //initializing all sections next
        const sections : SectionRow[] = sectionsInfo.map(section => { //const mapped for referencing later
          const newSection = new Section(
            section.section_title,
            section.time_period,
            section.position,
            section.last_modified
          );
          addSectionH(newSection);
          return section;
        });

        //Adding trackers to sections
        sections.sort((a,b) => a.position - b.position); //sort sections by position ascending
        sections.forEach((section) =>{
          const trackersInSection = sectionTrackersInfo.filter(sectionTracker => sectionTracker.section_id === section.section_id)
          trackersInSection.sort((a,b) => a.tracker_position - b.tracker_position); //sort by positioin in section
          trackersInSection.forEach(trackerInS => {
            const trackerRow = (trackers.filter(tracker => tracker.tracker_id === trackerInS.tracker_id)[0])//reference the tracker
            initialAddTrackerToSection(section.section_title,section.time_period,getTracker(trackerRow.tracker_name,trackerRow.time_period)!); // force unwrap, add tracker to section
          });
        });

      } catch (error) {
        console.error("Database error:",error);
      }
    };
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
