import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Alert, TextInput } from 'react-native';
import Header from '../helpers/Header';
import { styles, primaryColor, appBackgroundColor } from '../helpers/globalStyles';

const SavedOutfitsScreen = ({ navigation, route }) => {
  const [savedOutfits, setSavedOutfits] = useState([
    {
      id: 1,
      userImage: require('../../assets/greySweatshirtWorn.jpg'),
      clothingImage: require('../../assets/greySweatshirt.jpg'),
      date: '2024-02-29',
      name: 'Cozy Grey Outfit',
    },
    {
      id: 2,
      userImage: require('../../assets/whiteRainJacketWorn.jpg'),
      clothingImage: require('../../assets/whiteRainJacket.jpg'),
      date: '2024-03-01',
      name: 'Rain Jacket Vibes',
    },
    {
      id: 3,
      userImage: require('../../assets/peaCoatWorn.jpg'),
      clothingImage: require('../../assets/peaCoat.jpg'),
      date: '2024-03-02',
      name: 'Classic Peacoat Look',
    },
  ]);

  const [editingOutfitId, setEditingOutfitId] = useState(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    // Check if we have a new saved outfit from navigation params
    if (route.params?.newOutfit) {
      const { userImage, clothingImage, generatedImage } = route.params.newOutfit;

      const newOutfit = {
        id: Date.now(), // Use timestamp as unique ID
        userImage: userImage,
        clothingImage: clothingImage,
        generatedImage: generatedImage,
        date: new Date().toISOString().split('T')[0],
        name: 'Untitled Outfit', // Default name
      };

      setSavedOutfits(prevOutfits => [newOutfit, ...prevOutfits]);
      navigation.setParams({ newOutfit: null });
    }
  }, [route.params?.newOutfit]);

  const handleEditName = (id, name) => {
    setSavedOutfits(prevOutfits =>
      prevOutfits.map(outfit =>
        outfit.id === id ? { ...outfit, name } : outfit
      )
    );
    setEditingOutfitId(null);
    setEditedName('');
  };

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth * 0.85;
  const horizontalPadding = (windowWidth - itemWidth) / 2;

  const gridStyles = {
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: horizontalPadding,
      paddingTop: 20,
      paddingBottom: 40,
    },
    outfitItem: {
      width: itemWidth,
      aspectRatio: 1,
      backgroundColor: '#fff',
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    outfitImages: {
      flex: 1,
      flexDirection: 'row',
    },
    halfImage: {
      width: '50%',
      height: '100%',
    },
    nameLabel: {
      position: 'absolute',
      bottom: 15,
      left: 0,
      right: 0,
    },
    nameText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    noOutfitsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    noOutfitsText: {
      color: primaryColor,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
  };

  return (
    <View style={[styles.savedOutfitsContainer, { backgroundColor: appBackgroundColor }]}>
      <Header navigation={navigation} showBack={false} />
      {savedOutfits.length > 0 ? (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={gridStyles.scrollContent}
        >
          {savedOutfits.map((outfit) => (
            <TouchableOpacity 
              key={outfit.id}
              style={gridStyles.outfitItem}
              onPress={() => {
                navigation.navigate('ShowOutfit', { 
                  outfitId: outfit.id,
                  generatedImage: outfit.generatedImage,
                  userImage: outfit.userImage,
                  clothingImage: outfit.clothingImage,
                });
              }}
              activeOpacity={0.9}
              onLongPress={() => {
                setEditingOutfitId(outfit.id);
                setEditedName(outfit.name);
              }}
            >
              <View style={gridStyles.outfitImages}>
                <Image 
                  source={typeof outfit.userImage === 'string' ? { uri: outfit.userImage } : outfit.userImage} 
                  style={gridStyles.halfImage}
                  resizeMode="cover"
                />
                <Image 
                  source={typeof outfit.clothingImage === 'string' ? { uri: outfit.clothingImage } : outfit.clothingImage} 
                  style={gridStyles.halfImage}
                  resizeMode="cover"
                />
              </View>
              <View style={gridStyles.overlay} />
              <View style={gridStyles.nameLabel}>
                {editingOutfitId === outfit.id ? (
                  <TextInput
                    style={[gridStyles.nameText, { backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 5, padding: 5 }]}
                    value={editedName}
                    onChangeText={setEditedName}
                    onSubmitEditing={() => handleEditName(outfit.id, editedName)}
                    autoFocus
                  />
                ) : (
                  <Text style={gridStyles.nameText}>{outfit.name}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={gridStyles.noOutfitsContainer}>
          <Text style={gridStyles.noOutfitsText}>
            You haven't saved any outfits yet.
          </Text>
          <TouchableOpacity 
            style={styles.generalButton}
            onPress={() => navigation.navigate('OutfitCreator')}
          >
            <Text style={styles.generalButtonText}>Create Your First Outfit!</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SavedOutfitsScreen;

