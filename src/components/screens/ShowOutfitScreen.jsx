import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, Alert, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../helpers/Header';
import { styles, primaryColor, secondaryColor } from '../helpers/globalStyles';
import { generateOutfit, saveImageLocally } from '../../services/vtonService';

const ShowOutfitScreen = ({ navigation, route }) => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const { userImage, clothingImage } = route.params;
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const screenWidth = Dimensions.get('window').width;
  const maxWidth = screenWidth * 0.85;

  useEffect(() => {
    generateImage();
  }, []);

  useEffect(() => {
    if (generatedImage) {
      Image.getSize(generatedImage, (width, height) => {
        const aspectRatio = height / width;
        const calculatedHeight = maxWidth * aspectRatio;
        setImageSize({
          width: maxWidth,
          height: calculatedHeight
        });
        
        // Start animations when image is loaded
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 45,
            friction: 9,
            useNativeDriver: true,
          })
        ]).start();
      });
    }
  }, [generatedImage]);

  const generateImage = async () => {
    try {
      const generatedUrl = await generateOutfit(userImage, clothingImage);
      setGeneratedImage(generatedUrl);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate outfit');
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveImage = async () => {
    if (!generatedImage) return;
    
    setIsSaving(true);
    try {
      await saveImageLocally(generatedImage);
      
      // Navigate to Saved screen with the new outfit data
      navigation.navigate('Saved', {
        newOutfit: {
          userImage,
          clothingImage,
          generatedImage
        }
      });
      
      Alert.alert('Success', 'Image saved to your gallery!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save image');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.showOutfitContainer}>
      <Header navigation={navigation} showBack={true} />
      <View style={styles.showOutfitContent}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ 
              backgroundColor: secondaryColor, 
              padding: 30, 
              borderRadius: 15,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <ActivityIndicator size="large" color={primaryColor} />
              <Text style={{ 
                marginTop: 20,
                color: primaryColor,
                fontSize: 16,
                textAlign: 'center',
                fontWeight: '500'
              }}>
                Generating your outfit...{'\n'}This may take up to a minute
              </Text>
            </View>
          </View>
        ) : (
          <>
            <Animated.View 
              style={[
                styles.showOutfitImageContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                  flex: 0,
                  marginBottom: 20
                }
              ]}
            >
              <View style={{
                backgroundColor: 'white',
                borderRadius: 15,
                padding: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
              }}>
                <Image 
                  source={{ uri: generatedImage }} 
                  style={[
                    styles.showOutfitImage,
                    {
                      width: imageSize.width,
                      height: imageSize.height,
                      resizeMode: 'contain',
                      borderRadius: 10,
                    }
                  ]}
                />
                <View style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  backgroundColor: primaryColor,
                  borderRadius: 20,
                  padding: 8,
                }}>
                  <Ionicons name="checkmark-circle" size={24} color={secondaryColor} />
                </View>
              </View>
            </Animated.View>
            
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <TouchableOpacity 
                style={styles.generalButton}
                onPress={handleSaveImage}
                disabled={isSaving}
              >
                <Text style={styles.generalButtonText}>
                  {isSaving ? 'Saving...' : 'Save to Gallery'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.generalButton, { marginTop: 10 }]}
                onPress={() => navigation.navigate('OutfitCreator')}
              >
                <Text style={styles.generalButtonText}>Back To The Dressing Room!</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ShowOutfitScreen;
