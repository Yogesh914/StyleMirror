// screens/OutfitCreatorScreen.js
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Header from '../helpers/Header';
import ImageCarousel from '../helpers/ImageCarousel';
import { styles } from '../helpers/globalStyles';

const OutfitCreatorScreen = ({ navigation }) => (
  <View style={styles.outfitCreatorContainer}>
    <Header navigation={navigation} showBack={true} />
    <View style={styles.outfitCreatorContent}>
      <TouchableOpacity style={styles.generalButton}>
        <Text style={styles.generalButtonText}>Add User Image</Text>
      </TouchableOpacity>
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

export default OutfitCreatorScreen;