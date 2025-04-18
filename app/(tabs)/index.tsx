import { View, Alert, Pressable, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../ThemeContext"; // Import the ThemeContext
import { openDatabase } from "@/storage/sqlite";
import { useEffect } from "react";
import { Tracker } from "@/types/Tracker";
import { Section } from "@/types/Section";

// Used in square icon styling for dynamic styles - grid same for all phone sizes
const screenWidth = Dimensions.get("window").width;
const itemsPerRow = 4;
const spacing = 12;
const totalSpacing = spacing * (itemsPerRow + 1);
const sidesPadding = 16; // for grid mostly
const itemSize = (screenWidth - totalSpacing - sidesPadding * 2) / itemsPerRow;

export default function Index() {
  //trackers
  const trackersDaily: Tracker[] = new Array<Tracker>();
  const trackersWeekly: Tracker[] = new Array<Tracker>();
  const trackersMonthly: Tracker[] = new Array<Tracker>();

  //sections
  const sectionsDaily: Section[] = new Array<Section>();
  const sectionsWeekly: Section[] = new Array<Section>();
  const sectionsMonthly: Section[] = new Array<Section>();

  

  const router = useRouter();
  const { currentTheme } = useTheme(); // Get the current theme from context

  // Dynamic styles for square icon buttons
  const squareIconButtonStyle = (size: number) => ({
    ...styles.squareIconButton,
    backgroundColor: currentTheme["101010"],
    borderColor: currentTheme.dimgray,
    width: size,
    height: size,
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme["101010"] }]}>
      <StatusBar style="light" />
      {/* This view is for the top-left and top-right icons */}
      <View style={styles.topRow}>
        <Pressable
          onPress={() => router.push("/Profile")}
          style={[styles.cornerButton, { backgroundColor: currentTheme["101010"] }]}
        >
          <MaterialCommunityIcons name="account" size={40} color={currentTheme.white} />
        </Pressable>

        <Pressable
          onPress={() => router.push("/newTrackerView")}
          style={[styles.cornerButton, { backgroundColor: currentTheme["101010"] }]}
        >
          <Entypo name="plus" size={40} color={currentTheme.white} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.progressContainer}>
          <Progress.Circle
            size={100} // Size of the circle
            progress={0.76} // 76% progress
            thickness={10} // Border thickness
            showsText={false} // We add text separately
            color={currentTheme.lightgreen} // Progress color
            unfilledColor={currentTheme.dimgray} // Background color
            borderWidth={0} // No border
          />
          <Text style={[styles.progressText, { color: currentTheme.white }]}>76%</Text>
        </View>

        {/* Title text */}
        <Text style={[styles.title, { color: currentTheme.white }]}>Goals</Text>

        {/* Row of action buttons */}
        <View style={styles.iconRow}>
          <Pressable
            onPress={() => Alert.alert("Sleep button pressed")}
            style={squareIconButtonStyle(itemSize)}
          >
            <MaterialCommunityIcons name="power-sleep" size={40} color={currentTheme.white} />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Food button pressed")}
            style={squareIconButtonStyle(itemSize)}
          >
            <Ionicons name="fast-food-outline" size={40} color={currentTheme.white} />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Calorie button pressed")}
            style={squareIconButtonStyle(itemSize)}
          >
            <Ionicons name="flame-outline" size={40} color={currentTheme.white} />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Code button pressed")}
            style={squareIconButtonStyle(itemSize)}
          >
            <AntDesign name="codesquareo" size={30} color={currentTheme.white} />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Plus button pressed")}
            style={squareIconButtonStyle(itemSize)}
          >
            <AntDesign name="plus" size={30} color={currentTheme.white} />
          </Pressable>
        </View>

        {/* Title text */}
        <Text style={[styles.title, { color: currentTheme.white }]}>Limits</Text>

        <View style={styles.iconRow}>
          <Pressable
            onPress={() => Alert.alert("Limit button alert")}
            style={squareIconButtonStyle(itemSize)}
          >
            <Ionicons name="cash-outline" size={40} color={currentTheme.white} />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Button pressed")}
            style={squareIconButtonStyle(itemSize)}
          >
            <MaterialCommunityIcons name="spoon-sugar" size={40} color={currentTheme.white} />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Button pressed")}
            style={squareIconButtonStyle(itemSize)}
          >
            <AntDesign name="dashboard" size={30} color={currentTheme.white} />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Limit button alert")}
            style={squareIconButtonStyle(itemSize)}
          >
            <AntDesign name="instagram" size={40} color={currentTheme.white} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  cornerButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
    paddingBottom: 50,
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 25,
    marginBottom: 20,
  },
  progressText: {
    position: "absolute",
    top: 38,
    left: 29,
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  squareIconButton: {
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: spacing / 2,
  },
});