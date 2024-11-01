// screens/SavedOutfitsScreen.js
import { StyleSheet, View, Text } from 'react-native';
import Header from '../Header';
import { styles } from '../helpers/globalStyles';

const SavedOutfitsScreen = ({ navigation }) => (
  <View style={styles.savedOutfitsContainer}>
    <Header navigation={navigation} showBack={true} />
    <View style={styles.savedOutfitsContent}>
      <Text>Saved Outfits</Text>
    </View>
  </View>
);

export default SavedOutfitsScreen;