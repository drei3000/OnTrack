import { View, Alert, Pressable, Text, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
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
          <Entypo name="plus" size={30} color="white" />
        </Pressable>
      </View>

      {/* Used as spaces so content does not cover tl and tr icons */}
      <View style = {{ height: 35}} />  

      <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        paddingBottom: 50, // gives breathing room for bottom of the content , adjust as we like
      }}>
        <View style={progressStyles.progressContainer}>
          <Progress.Circle
            size={100} // Size of the circle
            progress={0.76} // 76% progress
            thickness={10} // Border thickness
            showsText={false} // We add text separately
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
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 16,
            paddingHorizontal: 25,
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
            onPress={() => Alert.alert("Code button pressed")}
            style={squareIconButtonStyle}
          >
            <AntDesign name="codesquareo" size={30} color="white" />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Plus button pressed")}
            style={squareIconButtonStyle}
          >
            <AntDesign name="plus" size={30} color="white" />
          </Pressable>
          
        </View>


        {/* Title text */}
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 50,
          }}
        >
          Limits
        </Text>

        <View
        style = {{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 16,
          paddingHorizontal: 25,
          marginTop: 20,
        }}
        >
          <Pressable
            onPress={() => Alert.alert("Limit button alert")}
            style={squareIconButtonStyle}
          >
            <Ionicons name="cash-outline" size={40} color="white"/> 
          </Pressable> 

          <Pressable
            onPress={() => Alert.alert("Button pressed")}
            style={squareIconButtonStyle}
          >
            <MaterialCommunityIcons name="spoon-sugar" size={40} color="white" />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Button pressed")}
            style={squareIconButtonStyle}
          >
            <AntDesign name="dashboard" size={30} color="white" />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Limit button alert")}
            style={squareIconButtonStyle}
          >
            <AntDesign name="instagram" size={40} color="white"/> 
          </Pressable> 

          <Pressable
            onPress={() => Alert.alert("Button pressed")}
            style={squareIconButtonStyle}
          >
            <Entypo name="area-graph" size={40} color="white" />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Button pressed")}
            style={squareIconButtonStyle}
          >
            <Entypo name="bowl" size={30} color="white" />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Limit button alert")}
            style={squareIconButtonStyle}
          >
            <Entypo name="credit" size={40} color="white"/> 
          </Pressable> 

          <Pressable
            onPress={() => Alert.alert("Button pressed")}
            style={squareIconButtonStyle}
          >
            <Entypo name="game-controller" size={40} color="white" />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Button pressed")}
            style={squareIconButtonStyle}
          >
            <AntDesign name="plus" size={30} color="white" />
          </Pressable>

        </View>
      </ScrollView>
      



      
    </SafeAreaView>
  );
}

const progressStyles = {
  progressContainer: {
    alignItems: "center" as const,  // Center align
    justifyContent: "center" as const,
    position: "relative" as const,
    marginTop: 25,                  // Push it down slightly
    marginBottom: 20,                // Space before next section
  },
  progressText: {
    position: "absolute" as const,   // Overlay on top of circle
    top: 38,
    left: 29,
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