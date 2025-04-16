import { Tabs } from "expo-router";
import { ThemeProvider } from "../ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#101010",
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            paddingVertical: 9,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="calendar" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="cog" color={color} />,
          }}
        />
      </Tabs>
    
  );
}
