import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../helpers/Header';
import ImageCarousel from '../helpers/ImageCarousel';
import { styles } from '../helpers/globalStyles';

const OutfitCreatorScreen = ({ navigation }) => {
  const [userImage, setUserImage] = useState(null);

  const pickImage = async () => {
    try {
      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }

      // Show the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setUserImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the image');
    }
  };

  const takePhoto = async () => {
    try {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera permissions to make this work!');
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setUserImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while taking the photo');
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Add Photo',
      'Choose a method to add your photo',
      [
        {
          text: 'Take Photo',
          onPress: takePhoto,
        },
        {
          text: 'Choose from Library',
          onPress: pickImage,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.outfitCreatorContainer}>
      <Header navigation={navigation} showBack={true} />
      <View style={styles.outfitCreatorContent}>
        {userImage ? (
          <View style={styles.userImageContainer}>
            <Image 
              source={{ uri: userImage }} 
              style={[styles.showOutfitImage, { marginBottom: 10 }]} 
            />
            <TouchableOpacity 
              style={[styles.generalButton, { marginTop: 10 }]}
              onPress={showImageOptions}
            >
              <Text style={styles.generalButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.generalButton}
            onPress={showImageOptions}
          >
            <Text style={styles.generalButtonText}>Add User Image</Text>
          </TouchableOpacity>
        )}
        
        <ImageCarousel 
          img1={require('../../assets/greySweatshirtWorn.jpg')}
          img2={require('../../assets/whiteRainJacketWorn.jpg')}
          img3={require('../../assets/peaCoatWorn.jpg')}
        />
        <TouchableOpacity style={styles.generalButton}>
          <Text style={styles.generalButtonText}>Add Clothing Item</Text>
        </TouchableOpacity>
        <ImageCarousel 
          img1={require('../../assets/greySweatshirt.jpg')}
          img2={require('../../assets/whiteRainJacket.jpg')}
          img3={require('../../assets/peaCoat.jpg')}
        />
        <TouchableOpacity 
          style={styles.generalButton}
          onPress={() => navigation.navigate('ShowOutfit')}
        >
          <Text style={styles.generalButtonText}>Try On Outfit!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OutfitCreatorScreen;