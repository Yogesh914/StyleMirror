// components/Header.js
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, secondaryColor } from './globalStyles';
import InfoButtonModal from '../modal&popups/InfoButtonModal';
import { useCallback, useEffect, useState } from 'react';

const Header = ({ navigation, showBack = false }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // const toggleInfoModal = () => setModalVisible(!modalVisible);
  // Use useCallback to memoize the toggle function
  const toggleInfoModal = useCallback(() => {
    setModalVisible(prev => !prev);
  }, []);
  
  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={secondaryColor} />
        </TouchableOpacity>
      )}
      
      <Text style={styles.headerTitle}>StyleMirror</Text>

      <TouchableOpacity style={styles.infoButton} onPress={toggleInfoModal}>
        <Ionicons name="information-circle-outline" size={28} color={secondaryColor}/>
      </TouchableOpacity>

      <InfoButtonModal
        visible={modalVisible}
        onClose={toggleInfoModal}
      />
    </View>
  );
};

export default Header;