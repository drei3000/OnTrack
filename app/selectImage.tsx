import React, { useState } from 'react';
import {FlatListComponent, FlatListProps, Text, StyleSheet, Pressable, View, Button, SafeAreaView, Image, TextInput, Dimensions, ScrollView, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { PixelRatio } from 'react-native';
import { iconsToChoose } from '@/assets/images/iconsToChoose';
//import IconComponent


export default function newTrackerView() {
    const icons = iconsToChoose
    return(
        <View style={styles.overlay}>
            <SafeAreaView style={styles.container}>
                <View style = {styles.selectedContainer}>
                    <Pressable style = {styles.icon}> {/* Probably will change from pressable */}
                        
                    </Pressable>
                </View>
                <View style = {styles.iconContainer}>
                  {/*
                <FlatList
                    data={icons}
                    numColumns={5} // 5 icons per row
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <Pressable 
                        onPress={() => handleIconPress(item)} 
                        style={styles.individualIcons}
                        >
                        <IconComponent icon={item} />
                        </Pressable>
                    )}
                    onEndReached={loadMoreIcons}
                    onEndReachedThreshold={0.5}
                    />
                    */}
                </View>
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


const styles = StyleSheet.create({
// Overlay itself
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
  selectedContainer: { //Container for selected image
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
  iconContainer: { //container for icon section
    flex: 7,
    width: '95%',
    aspectRatio: 1, //width = height
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  SelectImageContainer: { //container for screen image selection
    flex: 1,
    width: '100%',
    aspectRatio: 1, //width = height
    borderWidth: 1,
    borderRadius: 0,
    borderColor: 'transparent',
    borderTopColor: 'dimgray',
    alignItems: 'center',
  },

  // Image user can add to 
  icon: {
    aspectRatio: 1,
    height: '90%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  individualIcons: {
    aspectRatio: 1,

  }

});