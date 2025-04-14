// Import required libraries and components
import { View, Alert, Pressable, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useRouter } from "expo-router";
import Calendar from "../../components/CalendarComponent";
import { Dimensions } from "react-native";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

// Get device screen width for dynamic styling
const screenWidth = Dimensions.get("window").width;

// Global styles for main layout containers
const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    backgroundColor: "#101010",
    alignItems: "center",
  },
});

// Main functional component
export default function Index() {
  // Set initial date state using moment
  const [selectedDate, setSelectedDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const router = useRouter();

  return (
      <SafeAreaView 
        style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#101010",
      }}>
      {/* Header buttons */}
      {/* This view is for the top-left pfp */}
      <View
        style={{
          width: screenWidth,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingTop: 8,
        }}
      >
        <Pressable onPress={() => Alert.alert("Pfp icon pressed")} style={cornerButtonsStyle}>
          <MaterialCommunityIcons name="account" size={40} color="white" />
        </Pressable>
        <Pressable onPress={() => router.push("/newTrackerView")} style={cornerButtonsStyle}>
          <Entypo name="plus" size={40} color="white" />
        </Pressable>
      </View>

      {/* CALENDAR - Displayed just below header */}
      <View>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate || ""} />
      </View>
  
      {/* SCROLLVIEW - Contains gradient pressable buttons only */}
      <ScrollView>
        <View>
          <LinearGradient
            colors={["#E53935", "#FFDCD1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={gradientWrapperStyle(80)}
          >
            <Pressable
              onPress={() => Alert.alert("Pop up!")}
              style={buttonContentWrapper}
            >
              <AntDesign name="instagram" size={30} color="white" />
              <Text style={pressableTextStyle}>Social Media</Text>  
            </Pressable>
          </LinearGradient>

          <LinearGradient
            colors={["#E53935", "#FFDCD1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={gradientWrapperStyle(80)}
          >
            <Pressable
              onPress={() => Alert.alert("Pop up!")}
              style={buttonContentWrapper}
            >
              <MaterialCommunityIcons name="sleep" size={30} color="white" />
              <Text style={pressableTextStyle}>Sleep</Text>
            </Pressable>
          </LinearGradient>
        </View>

        <View style={{ height: 30 }} />

        <View>
          <LinearGradient
            colors={["#0041C2", "#E0B0FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={gradientWrapperStyle(80)}
          >
            <Pressable
              onPress={() => Alert.alert("Pop up!")}
              style={buttonContentWrapper}
            >
              <Ionicons name="fast-food-outline" size={30} color="white" />
              <Text style={pressableTextStyle}>Food</Text>
            </Pressable>
          </LinearGradient>

          <LinearGradient
            colors={["#0041C2", "#E0B0FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={gradientWrapperStyle(80)}
          >
            <Pressable
              onPress={() => Alert.alert("Pop up!")}
              style={buttonContentWrapper}
            >
              <Entypo name="area-graph" size={30} color="white" />
              <Text style={pressableTextStyle}>Productivity</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

// Style definition for header corner buttons
const cornerButtonsStyle = {
  backgroundColor: "#101010",
  width: 45,
  height: 45,
  justifyContent: "center" as const,
  alignItems: "flex-start" as const,
};

// Returns a style for the gradient pressable wrappers
const gradientWrapperStyle = (height: number) => ({
  width: screenWidth - 35,
  height: 72,
  borderRadius: 15,
  alignSelf: "center" as const,
  justifyContent: "center" as const,
  padding: 1,
  marginBottom: 20,
});

// Style for inner button layout
const buttonContentWrapper = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  paddingHorizontal: 16,
  flex: 1,
  borderRadius: 14,
  backgroundColor: "transparent",
};

const pressableTextStyle = {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "bold" as const,
  };



