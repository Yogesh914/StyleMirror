import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Header from '../helpers/Header';
import ImageCarousel from '../helpers/ImageCarousel';
import { styles, primaryColor } from '../helpers/globalStyles';

const OutfitCreatorScreen = ({ navigation }) => {
  const [userImage, setUserImage] = useState(null);
  const [clothingImage, setClothingImage] = useState(null);

  const pickImage = async (setImage) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the image');
    }
  };

  const takePhoto = async (setImage) => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while taking the photo');
    }
  };

  const showImageOptions = (setImage, title) => {
    Alert.alert(
      title,
      'Choose a method to add your photo',
      [
        {
          text: 'Take Photo',
          onPress: () => takePhoto(setImage),
        },
        {
          text: 'Choose from Library',
          onPress: () => pickImage(setImage),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const bothImagesSelected = userImage && clothingImage;

  return (
    <View style={[styles.outfitCreatorContainer]}>
      <Header navigation={navigation} showBack={true} />
      <ScrollView 
        style={[styles.outfitCreatorContent]} 
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Selected Images Display */}
        {(userImage || clothingImage) && (
          <View style={styles.selectedImagesContainer}>
            {userImage && (
              <View style={{ position: 'relative', width: '48%', aspectRatio: 1 }}>
                <Image 
                  source={{ uri: userImage }} 
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    borderColor: primaryColor,
                    borderWidth: 2,
                  }}
                />
                <TouchableOpacity 
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    backgroundColor: 'rgba(115, 78, 64, 0.8)',
                    borderRadius: 12,
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setUserImage(null)}
                >
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>
            )}
            {clothingImage && (
              <View style={{ position: 'relative', width: '48%', aspectRatio: 1 }}>
                <Image 
                  source={{ uri: clothingImage }} 
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    borderColor: primaryColor,
                    borderWidth: 2,
                  }}
                />
                <TouchableOpacity 
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    backgroundColor: 'rgba(115, 78, 64, 0.8)',
                    borderRadius: 12,
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setClothingImage(null)}
                >
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {!bothImagesSelected && (
          <>
            {!userImage && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.generalButton}
                  onPress={() => showImageOptions(setUserImage, 'Add User Image')}
                >
                  <Text style={styles.generalButtonText}>Add User Image</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {!userImage && (
              <View style={styles.carouselContainer}>
                <ImageCarousel 
                  img1={require('../../assets/greySweatshirtWorn.jpg')}
                  img2={require('../../assets/whiteRainJacketWorn.jpg')}
                  img3={require('../../assets/peaCoatWorn.jpg')}
                />
              </View>
            )}
            
            {!clothingImage && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.generalButton}
                  onPress={() => showImageOptions(setClothingImage, 'Add Clothing Item')}
                >
                  <Text style={styles.generalButtonText}>Add Clothing Item</Text>
                </TouchableOpacity>
              </View>
            )}

            {!clothingImage && (
              <View style={styles.carouselContainer}>
                <ImageCarousel 
                  img1={require('../../assets/greySweatshirt.jpg')}
                  img2={require('../../assets/whiteRainJacket.jpg')}
                  img3={require('../../assets/peaCoat.jpg')}
                />
              </View>
            )}
          </>
        )}
        
        {bothImagesSelected && (
          <View style={[styles.buttonContainer, styles.lastButtonContainer]}>
            <TouchableOpacity 
              style={styles.generalButton}
              onPress={() => navigation.navigate('ShowOutfit')}
            >
              <Text style={styles.generalButtonText}>Try On Outfit!</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OutfitCreatorScreen;