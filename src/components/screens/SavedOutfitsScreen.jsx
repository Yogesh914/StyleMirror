import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../helpers/Header';
import { styles, primaryColor, appBackgroundColor } from '../helpers/globalStyles';

const SavedOutfitsScreen = ({ navigation }) => {
  const savedOutfits = [
    {
      id: 1,
      userImage: require('../../assets/greySweatshirtWorn.jpg'),
      clothingImage: require('../../assets/greySweatshirt.jpg'),
      date: '2024-02-29'
    },
    {
      id: 2,
      userImage: require('../../assets/whiteRainJacketWorn.jpg'),
      clothingImage: require('../../assets/whiteRainJacket.jpg'),
      date: '2024-03-01'
    },
    {
      id: 3,
      userImage: require('../../assets/peaCoatWorn.jpg'),
      clothingImage: require('../../assets/peaCoat.jpg'),
      date: '2024-03-02'
    }
  ];

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth * 0.85; // 85% of screen width
  const horizontalPadding = (windowWidth - itemWidth) / 2; // Calculate padding to center items

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
      shadowOffset: {
        width: 0,
        height: 2,
      },
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
    dateLabel: {
      position: 'absolute',
      bottom: 15,
      left: 0,
      right: 0,
    },
    dateText: {
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
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View style={[styles.savedOutfitsContainer, { backgroundColor: appBackgroundColor }]}>
      <Header navigation={navigation} showBack={true} />
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
                navigation.navigate('ShowOutfit', { outfitId: outfit.id });
              }}
              activeOpacity={0.9}
            >
              <View style={gridStyles.outfitImages}>
                <Image 
                  source={outfit.userImage} 
                  style={gridStyles.halfImage}
                  resizeMode="cover"
                />
                <Image 
                  source={outfit.clothingImage} 
                  style={gridStyles.halfImage}
                  resizeMode="cover"
                />
              </View>
              <View style={gridStyles.overlay} />
              <View style={gridStyles.dateLabel}>
                <Text style={gridStyles.dateText}>
                  {formatDate(outfit.date)}
                </Text>
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