import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Header from '../helpers/Header';
import ImageCarousel from '../helpers/ImageCarousel';
import { styles, primaryColor, secondaryColor } from '../helpers/globalStyles';
import { uploadImageToFirebase } from '../../services/vtonService';

const OutfitCreatorScreen = ({ navigation }) => {
  const [userImage, setUserImage] = useState(null);
  const [clothingImage, setClothingImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadType, setUploadType] = useState(''); // 'user' or 'clothing'

  const pickImage = async (setImage, type) => {
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
        setIsLoading(true);
        setUploadType(type);
        try {
          const uploadedUrl = await uploadImageToFirebase(
            result.assets[0].uri, 
            type === 'user' ? 'users' : 'clothing'
          );
          setImage(uploadedUrl);
        } catch (error) {
          Alert.alert('Upload Error', 'Failed to upload image. Please try again.');
          console.error('Upload error:', error);
        } finally {
          setIsLoading(false);
          setUploadType('');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the image');
      console.error('Image picker error:', error);
    }
  };

  const takePhoto = async (setImage, type) => {
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
        setIsLoading(true);
        setUploadType(type);
        try {
          const uploadedUrl = await uploadImageToFirebase(
            result.assets[0].uri, 
            type === 'user' ? 'users' : 'clothing'
          );
          setImage(uploadedUrl);
        } catch (error) {
          Alert.alert('Upload Error', 'Failed to upload image. Please try again.');
          console.error('Upload error:', error);
        } finally {
          setIsLoading(false);
          setUploadType('');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while taking the photo');
      console.error('Camera error:', error);
    }
  };

  const showImageOptions = (setImage, type, title) => {
    Alert.alert(
      title,
      'Choose a method to add your photo',
      [
        {
          text: 'Take Photo',
          onPress: () => takePhoto(setImage, type),
        },
        {
          text: 'Choose from Library',
          onPress: () => pickImage(setImage, type),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const removeImage = (type) => {
    if (type === 'user') {
      setUserImage(null);
    } else {
      setClothingImage(null);
    }
  };

  const bothImagesSelected = userImage && clothingImage;

  const renderImagePreview = (imageUri, type) => {
    if (!imageUri) return null;

    return (
      <View style={localStyles.imagePreviewContainer}>
        <Image 
          source={{ uri: imageUri }} 
          style={localStyles.imagePreview}
        />
        <TouchableOpacity 
          style={localStyles.removeButton}
          onPress={() => removeImage(type)}
        >
          <Ionicons name="close" size={16} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderLoadingOverlay = () => {
    if (!isLoading) return null;

    return (
      <View style={localStyles.loadingOverlay}>
        <View style={localStyles.loadingContainer}>
          <ActivityIndicator size="large" color={primaryColor} />
          <Text style={localStyles.loadingText}>
            Uploading {uploadType === 'user' ? 'user' : 'clothing'} image...
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.outfitCreatorContainer}>
      <Header navigation={navigation} showBack={true} />
      <ScrollView 
        style={styles.outfitCreatorContent} 
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Selected Images Display */}
        {(userImage || clothingImage) && (
          <View style={styles.selectedImagesContainer}>
            {renderImagePreview(userImage, 'user')}
            {renderImagePreview(clothingImage, 'clothing')}
          </View>
        )}

        {!bothImagesSelected && (
          <>
            {!userImage && (
              <>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.generalButton}
                    onPress={() => showImageOptions(setUserImage, 'user', 'Add User Image')}
                  >
                    <Text style={styles.generalButtonText}>Add User Image</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.carouselContainer}>
                  <ImageCarousel 
                    img1={require('../../assets/greySweatshirtWorn.jpg')}
                    img2={require('../../assets/whiteRainJacketWorn.jpg')}
                    img3={require('../../assets/peaCoatWorn.jpg')}
                  />
                </View>
              </>
            )}
            
            {!clothingImage && (
              <>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.generalButton}
                    onPress={() => showImageOptions(setClothingImage, 'clothing', 'Add Clothing Item')}
                  >
                    <Text style={styles.generalButtonText}>Add Clothing Item</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.carouselContainer}>
                  <ImageCarousel 
                    img1={require('../../assets/greySweatshirt.jpg')}
                    img2={require('../../assets/whiteRainJacket.jpg')}
                    img3={require('../../assets/peaCoat.jpg')}
                  />
                </View>
              </>
            )}
          </>
        )}
        
        {bothImagesSelected && (
          <View style={[styles.buttonContainer, styles.lastButtonContainer]}>
            <TouchableOpacity 
              style={styles.generalButton}
              onPress={() => navigation.navigate('ShowOutfit', {
                userImage,
                clothingImage
              })}
            >
              <Text style={styles.generalButtonText}>Try On Outfit!</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {renderLoadingOverlay()}
    </View>
  );
};

const localStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  imagePreviewContainer: {
    position: 'relative',
    width: '48%',
    aspectRatio: 1,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderColor: primaryColor,
    borderWidth: 2,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(115, 78, 64, 0.8)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: secondaryColor,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: primaryColor,
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OutfitCreatorScreen;