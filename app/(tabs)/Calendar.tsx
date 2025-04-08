import { View, Alert, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Calendar from '../../components/CalendarComponent';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 2,
  },
  accountButton: {
    position: "absolute",
    top: 55,
    right: 12,
    zIndex: 2,
  },
  settingsButton: {
    position: "absolute",
    top: 55,
    right: 55,
    zIndex: 2,
  },
  plusButton: {
    position: "absolute",
    top: 50,
    right: 95,
    zIndex: 2,
  },
  pager: {
    flex: 1,
    marginTop: -550,
    backgroundColor: "transparent",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, 
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
  },
});


export default function Index() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header buttons */}
      <View style={styles.header}>
        <Pressable onPress={() => Alert.alert("Home button pressed")}>
          <MaterialCommunityIcons name="home" size={40} color="white" />
        </Pressable>

        <Pressable onPress={() => Alert.alert("Account button pressed")}>
          <MaterialCommunityIcons name="account" size={40} color="white" />
        </Pressable>

        <Pressable onPress={() => Alert.alert("Settings button pressed")}>
          <MaterialCommunityIcons name="cog" size={40} color="white" />
        </Pressable>

        <Pressable onPress={() => Alert.alert("Plus button pressed")}>
          <MaterialCommunityIcons name="plus" size={50} color="white" />
        </Pressable>
      </View>

      {/* Calendar component positioned below */}
      <View style={styles.calendarContainer}>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate || ""} />
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}