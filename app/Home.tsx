import { Text, View, Button, Alert, Pressable } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Pressable
    onPress= {() => Alert.alert('Simple Button pressed') }
    >
    <Text> Button </Text>
    </Pressable>
      <Text>Home Screen</Text>
    </View>
  );
}
