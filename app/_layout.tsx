import { Navigator, Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function TabLayout() {
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
        tabBarShowLabel : false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
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