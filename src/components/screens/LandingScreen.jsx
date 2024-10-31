// screens/LandingScreen.js
import { View, TouchableOpacity, Text } from 'react-native';
import Header from '../Header';
import ImageCarousel from '../ImageCarousel';
import { styles } from '../helpers/globalStyles';

const LandingScreen = ({ navigation }) => (
  <View style={styles.landingContainer}>
    <Header navigation={navigation} />
    <View style={styles.landingContent}>
      <ImageCarousel 
        img1={require('../../assets/greySweatshirt.jpg')}
        img2={require('../../assets/whiteRainJacket.jpg')}
        img3={require('../../assets/peaCoat.jpg')}
      />
      <ImageCarousel 
        img1={require('../../assets/greySweatshirtWorn.jpg')}
        img2={require('../../assets/whiteRainJacketWorn.jpg')}
        img3={require('../../assets/peaCoatWorn.jpg')}
      />
      <TouchableOpacity 
        style={styles.generalButton}
        onPress={() => navigation.navigate('OutfitCreator')}
      >
        <Text style={styles.generalButtonText}>Visit Dressing Room!</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default LandingScreen;