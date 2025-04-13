import React, { useState, useEffect, useRef } from 'react';
import {LayoutRectangle, UIManager, findNodeHandle, Modal, Image, TouchableOpacity, Text, StyleSheet, Pressable, View, Button, SafeAreaView, Dimensions, FlatList} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from "@expo/vector-icons";
import { PixelRatio } from 'react-native';
import { iconsToChoose } from '@/assets/images/iconsToChoose';
import { imageBoxStyles, IconItem, isUri } from './newTrackerView';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { runOnJS } from 'react-native-reanimated';

//Color selection functions
type ColorFormatsObject = { //describes format of colors
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsv: { h: number; s: number; v: number };
  opacity: number;
};



//If hex color
export const isHexColor = (color: string): boolean => {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(color);
};

//Visuals/function of each item
type ItemProps = { 
  item: IconItem; 
  onPress: () => void;
  backgroundColor: string;
  iconColor: string;
};



//the item to be rendered (selectable icons)
const Item = ({ item, onPress, backgroundColor, iconColor }: ItemProps) => (
  <TouchableOpacity //not pressable for visual effect
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
    {item.type === 'fa5' && ( //if fa5 render fontawesome5 : to introduce more itemtypes would have to change the way rendered
      <FontAwesome5 name={item.name as string} size={iconSize * 0.6} color={iconColor} />
    )}
  </TouchableOpacity>
);

export default function selectImage() {
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedImageUri, setSelectedImageUri] = useState<string>('');
  const [prevColorFlag, setPrevColorFlag] = useState<boolean>(false)
  const [prevColor, setPrevColor] = useState<string>('#ffffff')
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff');
  const router = useRouter(); 

  const iconRef = useRef<View>(null);

  const [iconPosition, setIconPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  //Handle selected color
  const onSelectColor = (color: ColorFormatsObject) => {
    if (!prevColorFlag){
      setPrevColor(selectedColor);
      setPrevColorFlag(true)
    }
    setSelectedColor(color.hex);
    console.log('Selected HEX:', color.hex);
  };

  //Initial handling
  const onSelectColorWorklet = (color: unknown) => {
    'worklet';
    runOnJS(onSelectColor)(color as ColorFormatsObject);
  };
    const measureIcon = () => {
    if (iconRef.current) {
      const handle = findNodeHandle(iconRef.current);
      if (handle) {
        UIManager.measure(handle, (_x, _y, _width, _height, pageX, pageY) => {
          setIconPosition({ x: pageX, y: pageY });
        });
      }
    }
  };

  interface ColorSelection {
    hex: string;
  }

  //if typematch (should be always) then use inputted image
  const params = useLocalSearchParams();
  const originalImage = typeof params.selectedImage === 'string' ? params.selectedImage : '';
  useEffect(() => {
    if (isUri(originalImage)) {
      setSelectedImageUri(originalImage);
    } else {
      setSelectedName(originalImage);
    }
  }, [originalImage]);

  //if selectedColor is hexcode then set originalColor
  const originalColor = typeof params.selectedColor == 'string' ? (isHexColor(params.selectedColor) ? params.selectedColor : '#ffffff') : '#ffffff';
  useEffect(() => {
    setSelectedColor(originalColor);
  }, [originalColor]);
  
  //rendering each icon
  const renderItem = ({ item }: { item: IconItem }) => {
    const backgroundColor = item.name === selectedName ? 'white' : '#101010'; // render white with black background if unselected, inverse if selecte
    const iconColor = selectedColor === '#ffffff' ? (item.name === selectedName ? 'black' : 'white') : selectedColor; //if color white inverse to background otherwise show selected color
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedName(item.name)
          setSelectedImageUri('')
        }}
        backgroundColor={backgroundColor}
        iconColor={iconColor}
      />
    );
  };

  const [showModal, setShowModal] = useState(false);
  const [iconSize, setIconSize] = useState(0); //icon size state (used to calculate necessary size)
  const [imageSize, setImageSize] = useState(0); //icon size state (used to calculate necessary size)
    return(

      //IF YOU ARE READING THIS I KNOW ITS A LOT OF VIEWS BUT THEY ARE GENUINELY ALL IMPORTANT
      //full screen overlay
      <View style={styles.overlay}> 
          {/* 'popup' box */}
          <SafeAreaView style={styles.container}> 
              {/* all image related buttons */}
              <View style = {imageBoxStyles.imageButtonsContainer}>
                {/* Left cross button*/}
                {(selectedName || selectedImageUri ) && ( //if selectedName '' dont render pressable
                  <Pressable 
                    style={imageBoxStyles.crossButton}
                    onPress={() => {
                      setSelectedName('')
                      setSelectedImageUri('')
                    }}
                  >
                    <Ionicons name="close" size={24} color="white" /> 
                  </Pressable>
                )}

                {/* icon display */}
                <Pressable 
                  ref={iconRef}
                  onPress={() => {
                    measureIcon();
                    setShowModal(true);
                    setPrevColorFlag(false)
                  }}
                  style = {imageBoxStyles.icon}
                  onLayout={(event) => { {/* get size according to box size on layout*/}
                    const { height, } = event.nativeEvent.layout;
                    setIconSize(height * 0.7); //size of icon
                  }}
                > 
                  {(selectedImageUri && iconSize > 0) ? (  //Render image if exists otherwise carry on to icon
                  <Image
                    source={{ uri: selectedImageUri }}
                    style={{
                      width: 98,
                      aspectRatio: 1,
                    }}
                    resizeMode="cover"
                  />
                  ) :
                  selectedName && iconSize > 0 && ( // if selectedName and iconSize valid then render icon
                    <FontAwesome5 
                      name={selectedName as string}
                      color={selectedColor}
                      size = {iconSize}
                      alignSelf = 'center'
                    />
                  )}
                </Pressable>

                {/* Tick button, render if selectedimage has changed and route back with image on press*/}
                {(
                  (originalImage === '' && (selectedImageUri !== '' || selectedName !== '')) || 
                  (originalImage !== '' && selectedImageUri !== originalImage && selectedName !== originalImage) 
                ) && (
                  <Pressable 
                  style={imageBoxStyles.tickButton}
                  onPress = {() => {
                    router.back();
                    //return either image uri or icon name, as well as color
                    router.setParams({color: selectedColor});
                    selectedImageUri ? router.setParams({ image: selectedImageUri }) : router.setParams({ image: selectedName });
                  }}
                  >
                    <Ionicons name="checkmark" size={24} color="white" />
                  </Pressable>
                )}
              </View>

              <Modal visible={showModal} animationType="fade" transparent>
                <View style={{ flex: 1 }}>
                  {/* Background layer */}
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() => {
                      setShowModal(false)
                      setSelectedColor(prevColor)
                      }
                    }
                  />

                  {/* Foreground: Actual picker popup */}
                  <View
                    style={{
                      position: 'absolute',
                      top: iconPosition.y + 100 + 5,
                      left: iconPosition.x + 50 - 100 - 10,
                      backgroundColor: 'black',
                      padding: 10,
                      borderRadius: 8,
                      elevation: 5,
                    }}
                    // Make sure it blocks touches
                    pointerEvents="auto"
                  >
                    <ColorPicker
                      style={{ width: 200, height: 200 }}
                      value={selectedColor}
                      onComplete={onSelectColorWorklet}
                    >
                      <Preview 
                      hideInitialColor = {true}
                      />
                      <Panel1 />
                      <HueSlider />
                    </ColorPicker>
                    <Pressable
                      onPress={() => setSelectedColor('#ffffff')}
                      style={[
                        styles.colorPickerButtons,
                        { 
                          backgroundColor: 'white',
                          marginTop: 55 //for some reason need margin, height of hue slider = 50 + leighweight
                        }
                      ]}
                    >
                      <Text
                      style = {{
                        color: 'black',
                        fontWeight: 'bold',

                      }}>
                        Default
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => setShowModal(false)}
                      style={[
                        styles.colorPickerButtons,
                        { backgroundColor: 'green' }
                      ]}
                    >
                      <Text
                      style = {{
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                        Confirm
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>

              {/* Icon selection, render selectable icons*/}
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

              {/*personal image selection (someone can fix styling can't be bothered right now) */}
              <View style = {styles.SelectImageContainer}>
                <TouchableOpacity 
                style = {styles.selectImageButton}

                onPress={async () => { //Press function to get the image
                  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                  if (status !== 'granted') {
                    alert('Permissions were declined');
                    return;
                  }
              
                  const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    quality: 1,
                  });
              
                  if (!result.canceled) { //If result successful
                    const selectedUri = result.assets[0].uri;
                    setSelectedImageUri(selectedUri); //save Uri
                    setSelectedName('');
                  }
                }}
                >
                  <MaterialCommunityIcons
                    name = 'file-image-plus-outline'
                    color = 'dimgray'
                    size = {30}
                    style ={{
                      marginRight: 5
                    }}
                  />
                  <Text
                    style = {{
                      color: 'dimgray',
                      fontSize: 24,
                      fontStyle: 'italic',
                      fontWeight: '400',
                    }}
                  >
                    Custom Image
                  </Text>
                </TouchableOpacity>
              </View>
          </SafeAreaView>
          {/* Exit Button (placed below the content) */}
    <Pressable
      onPress={() => {router.back()}}
      style={styles.exitButton}
    >
      <Text style={styles.exitButtonText}>
        Exit
      </Text>
    </Pressable>
      </View>
        
    )
}

const width = Dimensions.get('window').width-1
const height = Dimensions.get('window').height-1
const paddingContainer = 20
const scale = PixelRatio.get(); //For exact pixel adjustments adjust according to scale
const iconContainerWidth = (width * 0.85 - paddingContainer * 2) * 0.95 - 10; // Subtract horizontal padding
const iconSize = iconContainerWidth / 5; // 5 columns (could change for small devices?)

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
    borderRadius: 15, // Rounded edges
    borderWidth: 1,
    borderColor: 'dimgray',
    alignItems: "center",
    justifyContent: 'center'
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
    flex: 1,
    width: '95%',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'dimgray',
  },
  //individual items in scrollable list
  item: {
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //container for personal image selection
  SelectImageContainer: { 
    height: 70,
    width: '100%',
    borderWidth: 1,
    borderRadius: 0,
    borderColor: 'transparent',
    borderTopColor: 'dimgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectImageButton: {
    height: '85%',
    width: '95%',

    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'dimgray',
    backgroundColor: 'transparent',

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    
  },

  // Exit Button (below the modal)
  exitButton: {
    marginTop: 20, // Adds some space above the button
    backgroundColor: '#101010',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'dimgray',
  },
  exitButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

  //ColorPicker Buttons
  colorPickerButtons: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
  }
  

});