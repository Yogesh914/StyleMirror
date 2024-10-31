// screens/ShowOutfitScreen.js
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import Header from '../Header';
import { styles } from '../helpers/globalStyles';

const ShowOutfitScreen = ({ navigation }) => (
  <View style={styles.showOutfitContainer}>
    <Header navigation={navigation} showBack={true} />
    <View style={styles.showOutfitContent}>
      <View style={styles.showOutfitImageContainer}>
        <Image source={require('../../assets/whiteRainJacketWorn.jpg')} style={styles.showOutfitImage} />
      </View>
      <TouchableOpacity 
        style={styles.generalButton}
        onPress={() => navigation.navigate('OutfitCreator')}
      >
        <Text style={styles.generalButtonText}>Back To The Dressing Room!</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ShowOutfitScreen;