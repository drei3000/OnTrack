import { Navigator, Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { openDatabase } from "@/storage/sqlite";
import { useEffect } from "react";
import { Stack } from "expo-router";

export default function TabLayout() {
  useEffect(() => { //runs on launch
    const setupDatabase = async () => { //function to copy and open database
      try{
        const db = await openDatabase();
        console.log("Database initialized");
      } catch (error) {
        console.error("Database error:",error);
      }
    };

    setupDatabase();
  }, []);

  return (
    <>
    <StatusBar backgroundColor={'#101010'} barStyle = 'light-content' />
    {<Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#101010', 
        },
        tabBarItemStyle: {
          paddingVertical: 9,
        },
        tabBarShowLabel : false // maybe do true - looks alright
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={35} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: 'Calendar',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
    }
  </>
  );
}