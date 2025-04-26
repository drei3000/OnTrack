// Imports

import { View, Alert, Pressable, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Calendar from "../../components/CalendarComponent";
import { CalendarProps } from "../../components/CalendarComponent";
import { Dimensions } from "react-native";
import moment from "moment";
import { useTheme } from "../ThemeContext"; // Import ThemeContext
import { useSectionStore, useTrackerStore } from "@/storage/store";
import { Tracker } from "@/types/Tracker"; 
import { Section } from "@/types/Section"; 
import { getImage } from "../trackerList"; 
import { getIconInfo } from "@/types/Misc"; 
import { useAuth } from "../LoginContext";

const hexToRgba = (hex: string, alpha: number): string => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  };

// Helper to normalise display size on different size displays
const screenWidth = Dimensions.get("window").width;
export default function Index() {
    // Theme and naviagation
    const { currentTheme } = useTheme(); // Access current theme
    const router = useRouter();
    // Calendar ranges and pages
    type CalendarMode = CalendarProps["mode"];
    const buttons: CalendarMode[] = ["Daily", "Weekly", "Monthly"];
    const [selected, setSelected] = useState<CalendarMode>("Daily");

    // Selected date state
    const [selectedDate, setSelectedDate] = useState<string>(moment().format("YYYY-MM-DD"));

    // Zustand data constants
    const trackers = useTrackerStore((state) => state.trackers);
    const sections = useSectionStore((state) => state.sectionsH);
    const addTrackerToSection = useSectionStore((state) => state.addTrackerToSection);
    const { user } = useAuth();
    // Dynamic styles for tracker wrappers
    const trackerWrapperStyle = (height: number) => ({
    width: screenWidth - 35,
    height: 72,
    borderRadius: 15,
    alignSelf: "center" as const,
    justifyContent: "center" as const,
    // padding: 1,
    marginBottom: 20,
    overflow: "hidden" as const,
    });

    // Dynamic styles for corner buttons
    const cornerButtonsStyle = {
    backgroundColor: currentTheme["101010"],
    width: 45,
    height: 45,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    };

    // Dynamic styles for inner button layout
    const buttonContentWrapper = {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: 16,
    flex: 1,
    borderRadius: 14,
    backgroundColor: "transparent",
    };

    const pressableTextStyle = {
    color: currentTheme.white,
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "bold" as const,
    };

    // Whenever mode is changed we reset anchor date (the middle one we navigate to)
    useEffect(() => {
    if (selected === "Daily") {
        setSelectedDate(moment().format("YYYY-MM-DD"));
    } else if (selected === "Weekly") {
        setSelectedDate(moment().startOf("week").format("YYYY-MM-DD"));
    } else if (selected === "Monthly") {
        setSelectedDate(moment().startOf("month").format("YYYY-MM-DD"));
    }
    }, [selected]);

    // Dynamic and static rendering
    return (
    <SafeAreaView
        style={[styles.calendarContainer, { backgroundColor: currentTheme["101010"] }]}
    >
        <StatusBar style="light" />
        {/* Header buttons */}
        <View style={styles.header}>
        <Pressable onPress={() => {if (user === null){
            router.push("/Profile")} 
          else{
            router.push("/userLoggedIn")
          }
        }} style={cornerButtonsStyle}>
            <MaterialCommunityIcons name="account" size={40} color={currentTheme.white} />
        </Pressable>

        {/* Time frame buttons (Daily, weekly, monthly */}
        {buttons.map((btn) => (
            <TouchableOpacity
            key={btn}
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 10,
                backgroundColor: "transparent",
            }}
            onPress={() => setSelected(btn)}
            >
            <Text
                style={{
                color: selected === btn ? currentTheme.white : currentTheme.gray,
                fontWeight: selected === btn ? "bold" : "500",
                fontSize: selected === btn ? 15.1 : 15,
                }}

            >
                {btn}
            </Text>
            </TouchableOpacity>
        ))}
        <Pressable onPress={() => router.push("/newTrackerView")} style={cornerButtonsStyle}>
            <Entypo name="plus" size={40} color={currentTheme.white} />
        </Pressable>
        </View>

        {/* Calendar horizontal scroll */}
        <View>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate || ""} mode={selected} />
        </View>

        {/* Dynamic sections with their trackers added */}
        <ScrollView 
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}>
        {sections
            // Only show the time frame sections and trackers and no empty sections
            .filter((s) => s.timePeriod === selected && s.trackers.length > 0)
            .sort((a, b) => a.position - b.position)
            .map((section) => (
            <View
                key={`${section.sectionTitle}-${section.timePeriod}`}
                style={{ width: screenWidth - 35, alignSelf: "center", marginBottom: 28 }}
            >
                {/* Section title */}
                <Text
                style={{
                    color: currentTheme.white,
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                    marginLeft: 4,
                }}
                >
                {section.sectionTitle}
                </Text>

                {/* Trackers inside the section */}
                {section.trackers.map((tracker) => {
                const iconName = getIconInfo(tracker.icon).name;
                const emptyBackgroundColor = hexToRgba(getIconInfo(tracker.icon).color, 0.15);
                const fillBackgroundColor = hexToRgba(getIconInfo(tracker.icon).color, 0.5);
                const bound = tracker.bound ?? 0;
                const currentProgress = bound > 0? Math.min(1, tracker.currentAmount / bound) : 0;

                // To test progress values, maybe add animations?
                // const currentProgress = 0.6; 

                return (
                    // Renders trackers, and their progress
                    <View
                    key={`${tracker.trackerName}-${tracker.timePeriod}`}
                    style={[trackerWrapperStyle(60), { backgroundColor: emptyBackgroundColor }]}
                    >
                        <View style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${currentProgress * 100}%`, backgroundColor: fillBackgroundColor }} />

                    <Pressable
                        onPress={() =>
                        router.push({
                            pathname: "/editTracker",
                            params: {
                            trackerN: tracker.trackerName,
                            timeP: tracker.timePeriod,
                            color: getIconInfo(tracker.icon).color,
                            image: iconName,
                            },
                        })
                        }
                        style={buttonContentWrapper}
                    >
                        {
                        // Safe icon render, had problem with string from getImage
                        typeof getImage(tracker, 30, currentTheme.white).icon === "string"
                            ? <MaterialCommunityIcons name="image" size={30} color={currentTheme.white} />
                            : getImage(tracker, 30, currentTheme.white).icon
                        }
                        <Text style={pressableTextStyle}>{tracker.trackerName}</Text>
                    </Pressable>
                    </View>
                );
                })}
            </View>
            ))}
        </ScrollView>
    </SafeAreaView>
    );
}

// Stylesheet for stattic styles only
const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  buttonContainer: {
    width: (3 * screenWidth) / 4,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  text: {
    fontWeight: "500",
    color: "white",
  },
});
