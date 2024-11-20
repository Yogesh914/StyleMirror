import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Image, PanResponder, Dimensions } from 'react-native';
import { styles } from './globalStyles';

const SCROLL_SPEED = 15000;
const IMAGE_WIDTH = 160;
const IMAGE_MARGIN = 10;
const ANIMATION_DELAY = 2000;

const ImageCarousel = ({ img1, img2, img3 }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const animationTimer = useRef(null);
  const images = [img1, img2, img3, img1, img2, img3];
  const contentWidth = images.length * (IMAGE_WIDTH + IMAGE_MARGIN);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: -(contentWidth / 2),
          duration: SCROLL_SPEED,
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(scrollX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
          isInteraction: false,
        })
      ])
    ).start();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsUserScrolling(true);
      scrollX.stopAnimation();
      clearTimeout(animationTimer.current);
    },
    onPanResponderMove: (_, gestureState) => {
      scrollX.setValue(gestureState.dx);
    },
    onPanResponderRelease: () => {
      setIsUserScrolling(false);
      clearTimeout(animationTimer.current);
      animationTimer.current = setTimeout(() => {
        startAnimation();
      }, ANIMATION_DELAY);
    },
  });

  useEffect(() => {
    startAnimation();
    return () => {
      scrollX.stopAnimation();
      clearTimeout(animationTimer.current);
    };
  }, []);

  return (
    <View style={[styles.carousel, { overflow: 'hidden' }]} {...panResponder.panHandlers}>
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX: scrollX }],
        }}
      >
        {images.map((img, index) => (
          <Image 
            key={index} 
            source={img} 
            style={[styles.carouselImage, { marginRight: IMAGE_MARGIN }]} 
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default ImageCarousel;