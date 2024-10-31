// components/ImageCarousel.js
import { StyleSheet, ScrollView, Image } from 'react-native';
import { styles } from './helpers/globalStyles';

const ImageCarousel = ({ img1, img2, img3 }) => (
    <ScrollView 
      horizontal 
      style={styles.carousel}
      contentContainerStyle={styles.carouselContent}
    >
      <Image source={img1} style={styles.carouselImage} />
      <Image source={img2} style={styles.carouselImage} />
      <Image source={img3} style={styles.carouselImage} />
    </ScrollView>
  );

export default ImageCarousel;