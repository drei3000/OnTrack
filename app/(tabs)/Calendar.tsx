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
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../ThemeContext"; // Import ThemeContext
import { useSectionStore, useTrackerStore } from "@/storage/store";
import { Tracker } from "@/types/Tracker"; 
import { Section } from "@/types/Section"; 
import { getImage } from "../trackerList"; 
import { getIconInfo } from "@/types/Misc"; 

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

    // Dynamic styles for gradient wrappers
    const gradientWrapperStyle = (height: number) => ({
    width: screenWidth - 35,
    height: 72,
    borderRadius: 15,
    alignSelf: "center" as const,
    justifyContent: "center" as const,
    padding: 1,
    marginBottom: 20,
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

    // Gradient Builder
    // Map an icon name to gradient colours, takes hex colour and returns [original, lighter-shade]
    const gradientFor = (iconName: string): [string, string] => {
    switch (iconName) {
        case "instagram":
        case "sleep":
        return [currentTheme["E53935"], currentTheme["FFDCD1"]];
        case "fast-food-outline":
        case "area-graph":
        return [currentTheme["0041C2"], currentTheme["E0B0FF"]];
        default:
        return [currentTheme.dimgray, currentTheme.gray];
    }
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
        <Pressable onPress={() => Alert.alert("Pfp icon pressed")} style={cornerButtonsStyle}>
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
                fontSize: selected === btn ? 17 : 15,
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
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
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
                const [from, to] = gradientFor(iconName);

                return (
                    <LinearGradient
                    key={`${tracker.trackerName}-${tracker.timePeriod}`}
                    colors={[from, to]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={gradientWrapperStyle(60)}
                    >
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
                        // Safe icon render (fallback prevents raw string → <Text> error)
                        typeof getImage(tracker, 30).icon === "string"
                            ? <MaterialCommunityIcons name="image" size={30} color={currentTheme["101010"]} />
                            : getImage(tracker, 30).icon
                        }
                        <Text style={pressableTextStyle}>{tracker.trackerName}</Text>
                    </Pressable>
                    </LinearGradient>
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
