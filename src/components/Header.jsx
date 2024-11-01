// components/Header.js
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, lightGray } from './helpers/globalStyles';

const Header = ({ navigation, showBack = false }) => (
  <View style={styles.header}>
    {showBack && (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color={lightGray} />
      </TouchableOpacity>
    )}
    <Text style={styles.headerTitle}>StyleMirror</Text>
    <TouchableOpacity style={styles.infoButton}>
      <Ionicons name="information-circle-outline" size={28} color={lightGray} />
    </TouchableOpacity>
  </View>
);

export default Header;