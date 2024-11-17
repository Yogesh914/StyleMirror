import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Animated, Dimensions, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { primaryColor, secondaryColor, appBackgroundColor, styles } from '../helpers/globalStyles';

const { width } = Dimensions.get('window');

const InfoButtonModal = ({ visible, onClose }) => {
    const [modalVisible, setModalVisible] = useState(visible);
    const [currentPage, setCurrentPage] = useState(0);
    const slideAnim = useRef(new Animated.Value(width)).current;
    const scrollViewRef = useRef(null);
    const [fadeAnim] = useState(new Animated.Value(0));
    
    const pages = [
        { 
            title: "How It Works",
            content: "StyleMirror helps you organize and create outfits easily. Take photos of your clothing items and we'll help you mix and match them into perfect combinations." 
        },
        {
            title: "How It Works",
            content: "Save your favorite outfits and access them anytime. Create collections for different occasions and seasons to stay organized."
        },
        {
            title: "How It Works",
            content: "Get inspired by viewing your saved outfits in a beautiful gallery format. Share your creations with friends or keep them private."
        }
    ];

    useEffect(() => {
        if (visible) {
            fadeAnim.setValue(0);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
            // Start from right (width) and slide to center (0)
            slideAnim.setValue(width);
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 60,
                friction: 15
            }).start();
        }
    }, [visible]);

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / width);
        setCurrentPage(page);
    };

    const handleClose = () => {
        Animated.parallel([
            Animated.spring(slideAnim, {
                toValue: -width,
                useNativeDriver: true,
                tension: 120,
                friction: 8,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => onClose());
    };

    return (
        <Modal
            transparent
            visible={visible}
            onRequestClose={handleClose}
        >
            {/* <View style={styles.modalOverlay}> */}
            <Animated.View style={[styles.modalOverlay, {
                opacity: fadeAnim
            }]}>
                <Animated.View 
                    style={[
                        styles.infoModalContainer, 
                        { transform: [{ translateX: slideAnim }], width: width * 0.9 }
                    ]}
                >
                    <TouchableOpacity 
                        style={styles.infoModalCloseButton}
                        onPress={handleClose}
                    >
                        <Ionicons name="close" size={28} color={primaryColor} />
                    </TouchableOpacity>

                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    >
                        {pages.map((page, index) => (
                        <View key={index} style={[styles.infoModalPage, {width: width * 0.9}]}>
                            <Text style={styles.infoModalTitle}>{page.title}</Text>
                            <Text style={styles.infoModalContent}>{page.content}</Text>
                        </View>
                        ))}
                    </ScrollView>

                    <View style={styles.infoModalPagination}>
                        {pages.map((_, index) => (
                        <View
                            key={index}
                            style={[
                            styles.dot,
                            currentPage === index && styles.activeDot
                            ]}
                        />
                        ))}
                    </View>
                </Animated.View>
            </Animated.View>
            {/* </View> */}
        </Modal>
    );
};

export default InfoButtonModal;