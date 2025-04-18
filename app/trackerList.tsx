import { Image, View, ScrollView } from "react-native";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "./ThemeContext";
import { useTrackerStore } from "@/storage/store";
import { Tracker, exampleTrackers } from "@/types/Tracker";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { getIconInfo } from "@/types/Misc";

const getImage = (inputTracker: Tracker): {icon: JSX.Element} => {
    const {type, name, color} = getIconInfo(inputTracker.icon);
    console.log(color);
    if (type == "fa5"){ //if fa5 icon
        return{
            icon: <FontAwesome5 name = {name} size = {40} color ={color}/>
        }
    }else if(type == "image"){ // if image
        return{
            icon:  <Image source={{ uri: name, 
            
            }}/>
        }
    }
    return { // in theory unnecessary
        icon: <FontAwesome5 name = {""} size = {24} color ={color}/>
    }
}
const renderTracker = ({ tracker }: { tracker: Tracker }) => {
    const {currentTheme} = useTheme();
    return (
        
            <TouchableOpacity
            style = {[
                styles.trackerButton,
                {
                borderBottomColor: currentTheme['dimgray'],
                backgroundColor: currentTheme['transparent'],
                }
            ]}
            >
            <View style = {[styles.iconContainer]}>
                {getImage(tracker).icon}
            </View>
                
                <Text style={styles.trackerText}>
                    {tracker.trackerName}
                </Text>
            </TouchableOpacity>
    );
};
export default function trackerList(){
    const { currentTheme } = useTheme();
    const trackers = useTrackerStore((state) => state.trackers);
    const trackersDaily = trackers.filter((tracker) => tracker.timePeriod === 'DAILY');
    const trackersWeekly = trackers.filter((tracker) => tracker.timePeriod === 'WEEKLY');
    const trackersMonthly = trackers.filter((tracker) => tracker.timePeriod === 'MONTHLY');
    const buttons = ["Daily", "Weekly", "Monthly"]; //Time Period button states
    const [selected, setSelected] = useState("Daily");

    return(
        <SafeAreaView 
            style = {[
                styles.safeArea,
                {backgroundColor: currentTheme['101010']}
            ]}
        >
            {/* Daily/Weekly/Monthly buttons */}
            <View style={[
                styles.buttonContainer
                ]}>
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
            <ScrollView
                style = {[
                    styles.scrollView,
                ]}>
                    {(selected === 'Daily') ? trackersDaily.map((tracker) => renderTracker({ tracker })) 
                    :((selected === 'Weekly') ? trackersWeekly.map((tracker) => renderTracker({ tracker }))
                        : trackersMonthly.map((tracker) => renderTracker({tracker}))
                    )} 
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        width: '100%',
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    scrollView: {
        width: '100%',
        flex: 1,
        flexDirection: 'column'
    },
    
    trackerButton: {
        width: '100%',
        height: 80,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    trackerText: {
        marginLeft: 5,
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 8,
      },
    iconContainer: {
        height: '100%',
        aspectRatio: 1,

        alignItems: 'center',
        justifyContent: 'center',
    }
})
