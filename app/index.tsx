import { View, Alert, Pressable, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress"; 

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#101010",
      }}
    >
      {/* This view is for the top-left pfp */}
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 22,
        }}
      >
        <Pressable
          onPress={() => Alert.alert("Pfp icon pressed")}
          style={cornerButtonsStyle}
        >
          <MaterialCommunityIcons name="account" size={40} color="white" />
        </Pressable>
      </View>

      {/* This view is for the top-right calendar icon */}
      <View
        style={{
          position: "absolute",
          top: 50,
          right: 10,
        }}
      >
        <Pressable
          onPress={() => Alert.alert("Calendar icon pressed")}
          style={cornerButtonsStyle}
        >
          <AntDesign name="calendar" size={30} color="white" />
        </Pressable>
      </View>

      <View style={progressStyles.progressContainer}>
        <Progress.Circle
          size={100} // Size of the circle
          progress={0.76} // 76% progress
          thickness={10} // Border thickness
          showsText={false} // We’ll add text separately
          color="lightgreen" // Progress color
          unfilledColor="#333" // Background color
          borderWidth={0} // No border
        />
        <Text style={progressStyles.progressText}>76%</Text>
      </View>


      {/* Title text */}
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          marginTop: 50,
        }}
      >
        Goals
      </Text>

      {/* Row of action buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Pressable
          onPress={() => Alert.alert("Sleep button pressed")}
          style={squareIconButtonStyle}
        >
          <MaterialCommunityIcons name="power-sleep" size={40} color="white" />
        </Pressable>

        <Pressable
          onPress={() => Alert.alert("Food button pressed")}
          style={squareIconButtonStyle}
        >
          <Ionicons name="fast-food-outline" size={40} color="white" />
        </Pressable>

        <Pressable
          onPress={() => Alert.alert("Calorie button pressed")}
          style={squareIconButtonStyle}
        >
          <Ionicons name="flame-outline" size={40} color="white" />
        </Pressable>

        <Pressable
          onPress={() => Alert.alert("Plus button pressed")}
          style={squareIconButtonStyle}
        >
          <AntDesign name="plus" size={30} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const progressStyles = {
  progressContainer: {
    alignItems: "center" as const,  // Center align
    marginTop: 60,                  // Push it down slightly
    marginBottom: 20,                // Space before next section
  },
  progressText: {
    position: "absolute" as const,   // Overlay on top of circle
    transform: [{ translateX: 0 }, { translateY: 37 }], // Offsets text as otherwise sits on top of circle
    fontSize: 20,                    // Readable size
    fontWeight: "bold" as const,      // Bold text
    color: "white",                   // White text color
  },
};

// Styling for square icon buttons
const squareIconButtonStyle = {
  backgroundColor: "#101010",
  borderColor: "dimgray",
  padding: 12,
  borderRadius: 5,
  borderWidth: 1,
  width: 70,
  height: 70,
  justifyContent: "center" as const,
  alignItems: "center" as const,
};

// Styling for corner buttons
const cornerButtonsStyle = {
  backgroundColor: "#101010",
  width: 45,
  height: 45,
  justifyContent: "center" as const,
  alignItems: "flex-start" as const,
};