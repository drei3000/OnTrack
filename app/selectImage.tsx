import React, { useState } from 'react';
import {TouchableOpacity, FlatListComponent, FlatListProps, Text, StyleSheet, Pressable, View, Button, SafeAreaView, Image, TextInput, Dimensions, ScrollView, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { PixelRatio } from 'react-native';
import { iconsToChoose } from '@/assets/images/iconsToChoose';
//import IconComponent

type IconItem = { //
  name: string;
  type: string; 
};

type ItemProps = {
  item: IconItem;
  onPress: () => void;
  backgroundColor: string;
  iconColor: string;
};

const Item = ({ item, onPress, backgroundColor, iconColor }: ItemProps) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={[
      styles.item, 
      { 
        backgroundColor,
        width: iconSize,
        height: iconSize,
      }
    ]}
  >
    {item.type === 'fa5' && (
      <FontAwesome5 name={item.name as any} size={iconSize * 0.6} color={iconColor} />
    )}
  </TouchableOpacity>
);

export default function newTrackerView() {
  const [selectedName, setSelectedName] = useState<string>();

  const renderItem = ({ item }: { item: IconItem }) => {
    const backgroundColor = item.name === selectedName ? 'white' : 'black';
    const iconColor = item.name === selectedName ? 'black' : 'white';

    return (
      <Item
        item={item}
        onPress={() => setSelectedName(item.name)}
        backgroundColor={backgroundColor}
        iconColor={iconColor}
      />
    );
  };

  const [iconSize, setIconSize] = useState(0);

    return(
    
        <View style={styles.overlay}>
            <SafeAreaView style={styles.container}>
                <View style = {styles.selectedContainer}>
                    <Pressable 
                      style = {styles.icon}
                      onLayout={(event) => {
                        const { height, } = event.nativeEvent.layout;
                        setIconSize(height * 0.7);
                      }}
                    > 
                      {selectedName && iconSize > 0 && (
                        <FontAwesome5 
                          name={selectedName as any}
                          color="white" 
                          size = {iconSize}
                          alignSelf = 'center'
                          justifySelf = 'center'
                        />
                      )}
                    </Pressable>
                </View>
                <SafeAreaView style = {styles.iconContainer}>
                  <FlatList
                    data = {iconsToChoose}
                    renderItem={renderItem}
                    keyExtractor={item => item.name}
                    extraData={selectedName}
                    numColumns={5}
                    showsVerticalScrollIndicator = {false}
                  />
                </SafeAreaView>
                <View style = {styles.SelectImageContainer}>

                </View>
            </SafeAreaView>
        </View>
    )
}

const width = Dimensions.get('window').width-1
const height = Dimensions.get('window').height-1
const paddingContainer = 20
const scale = PixelRatio.get(); //For exact pixel adjustments adjust according to scale
const iconContainerWidth = width * 0.85 - paddingContainer * 2; // Subtract horizontal padding
const iconSize = iconContainerWidth / 5; // Divide by number of columns

const styles = StyleSheet.create({
  //Modal overlay itself
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // 0.8 opacity of darkness
    justifyContent: "center",

    // Stretch to fill center
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  //Entire container
  container: {
    height: height*0.8,
    width: width*0.85,
    backgroundColor: "#101010",
    paddingHorizontal: paddingContainer, // Keep horizontal padding
    paddingVertical: paddingContainer, // Add vertical padding
    borderRadius: 15, // Rounded edges
    borderWidth: 1,
    borderColor: 'dimgray',
    alignItems: "center",
    justifyContent: 'center'
  },
  //Container at top (contains selected image box)
  selectedContainer: {
    flex: 2,
    width: '95%',
    marginTop: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 0,
    borderColor: 'transparent',
    borderBottomColor: 'dimgray',
  },
  //Selected icon square
  icon: {
    aspectRatio: 1,
    height: '90%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Container for scrollable icon list
  iconContainer: {
    flex: 7,
    width: '95%',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //individual items in scrollable list
  item: {
    padding: 0,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //container for personal image selection
  SelectImageContainer: { 
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: 'transparent',
    borderTopColor: 'dimgray',
    alignItems: 'center',
  },
  

});