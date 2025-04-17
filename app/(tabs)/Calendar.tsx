import { View, Alert, Pressable, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useRouter } from "expo-router";
import Calendar from "../../components/CalendarComponent";
import { Dimensions } from "react-native";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

// Get device screen width for dynamic styling
const screenWidth = Dimensions.get("window").width;

export default function Index() {
  const { currentTheme } = useTheme(); // Access current theme
  const [selectedDate, setSelectedDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const router = useRouter();
  const buttons = ["Daily", "Weekly", "Monthly"];
  const [selected, setSelected] = useState("Daily");

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

  return (
    <SafeAreaView
      style={[
        styles.calendarContainer,
        { backgroundColor: currentTheme["101010"] }, // Use theme background color
      ]}
    >
      <StatusBar style="light" />
      {/* Header buttons */}
      <View style={styles.header}>
        <Pressable onPress={() => Alert.alert("Pfp icon pressed")} style={cornerButtonsStyle}>
          <MaterialCommunityIcons name="account" size={40} color={currentTheme.white} />
        </Pressable>
        <Pressable onPress={() => router.push("/newTrackerView")} style={cornerButtonsStyle}>
          <Entypo name="plus" size={40} color={currentTheme.white} />
        </Pressable>
      </View>

      {/* Daily/Weekly/Monthly buttons */}
      <View style={[styles.buttonContainer]}>
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
        backgroundColor: selected === btn ? currentTheme.white : currentTheme["101010"], // Dynamic background color
      }}
      onPress={() => setSelected(btn)}
    >
      <Text
        style={{
          fontWeight: "500",
          color: selected === btn ? currentTheme["101010"] : currentTheme.white, // Dynamic text color
        }}
      >
        {btn}
      </Text>
    </TouchableOpacity>
  ))}
</View>

      {/* Calendar */}
      <View>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate || ""} />
      </View>

      {/* ScrollView with gradient buttons */}
      <ScrollView>
        <View>
          <LinearGradient
            colors={[currentTheme["E53935"], currentTheme["FFDCD1"]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={gradientWrapperStyle(80)}
          >
            <Pressable onPress={() => Alert.alert("Pop up!")} style={buttonContentWrapper}>
              <AntDesign name="instagram" size={30} color={currentTheme.white} />
              <Text style={pressableTextStyle}>Social Media</Text>
            </Pressable>
          </LinearGradient>

          <LinearGradient
            colors={[currentTheme["E53935"], currentTheme["FFDCD1"]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={gradientWrapperStyle(80)}
          >
            <Pressable onPress={() => Alert.alert("Pop up!")} style={buttonContentWrapper}>
              <MaterialCommunityIcons name="sleep" size={30} color={currentTheme.white} />
              <Text style={pressableTextStyle}>Sleep</Text>
            </Pressable>
          </LinearGradient>
        </View>

        <View style={{ height: 30 }} />

        <View>
          <LinearGradient
            colors={[currentTheme["0041C2"], currentTheme["E0B0FF"]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={gradientWrapperStyle(80)}
          >
            <Pressable onPress={() => Alert.alert("Pop up!")} style={buttonContentWrapper}>
              <Ionicons name="fast-food-outline" size={30} color={currentTheme.white} />
              <Text style={pressableTextStyle}>Food</Text>
            </Pressable>
          </LinearGradient>

          <LinearGradient
            colors={[currentTheme["0041C2"], currentTheme["E0B0FF"]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={gradientWrapperStyle(80)}
          >
            <Pressable onPress={() => Alert.alert("Pop up!")} style={buttonContentWrapper}>
              <Entypo name="area-graph" size={30} color={currentTheme.white} />
              <Text style={pressableTextStyle}>Productivity</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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