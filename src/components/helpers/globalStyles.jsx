import { StyleSheet, Dimensions } from 'react-native';


export const appBackgroundColor = '#EFD5C2'; // Peach/Khaki & Green Theme
// export const primaryColor = '#736C49'
// export const secondaryColor = '#F1E2C3'
// export const appBackgroundColor = '#F1E1C3'; // Green-ish Theme
// export const primaryColor = '#736C49'
// export const secondaryColor = '#F1E2C3'
// export const appBackgroundColor = '#D9B5A0'; // Brown-ish theme
export const primaryColor = '#734E40'
export const secondaryColor = '#F1E2C3'
const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoModalContainer: {
        height: 300,
        backgroundColor: secondaryColor,
        borderRadius: 30,
        overflow: 'hidden',
        position: 'relative',
    },
    infoModalCloseButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    infoModalPage: {
        paddingHorizontal: 15,
        paddingTop: 50,
        paddingBottom: 0,
        alignItems: 'center',
    },
    infoModalTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'Ephesis-Regular',
        color: primaryColor,
        marginBottom: 15,
    },
    infoModalContent: {
        fontSize: 16,
        color: primaryColor,
        textAlign: 'center',
        lineHeight: 25,
    },
    infoModalPagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: primaryColor,
        opacity: 0.3,
        marginHorizontal: 4,
    },
    activeDot: {
        opacity: 1,
    },
    showOutfitContainer: {
        flex: 1,
        backgroundColor: appBackgroundColor,
    },
    showOutfitContent: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    showOutfitImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    showOutfitImage: {
        width: 300,
        height: 300,
        borderColor: primaryColor,
        borderRadius: 2,
        borderWidth: 2
    },
    generalButton: {
        backgroundColor: primaryColor,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    generalButtonText: {
        color: secondaryColor,
        fontSize: 27,
        fontFamily: 'Ephesis-Regular',
        fontWeight: 'bold',
    },
    savedOutfitsContainer: {
        flex: 1,
        backgroundColor: appBackgroundColor,
    },
    savedOutfitsContent: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    outfitCreatorContainer: {
        flex: 1,
        backgroundColor: appBackgroundColor,
    },
    outfitCreatorContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50,
        gap: 20,
    },
    landingContainer: {
        flex: 1,
        backgroundColor: appBackgroundColor,
    },
    landingContent: {
        paddingHorizontal: 20,
        paddingVertical: 60,
        gap: 50,
    },
    carousel: {
        height: 170
    },
    carouselContent: {
        paddingBottom: 0,
    },
    carousel: {
        height: 190, // Increased height to accommodate shadow
        marginVertical: 10,
        marginLeft: -20, // Negative margin only on left to offset parent padding
        width: SCREEN_WIDTH, // Full screen width
    },
    carouselContent: {
        paddingBottom: 0,   
    },
    carouselImage: {
        width: 160,
        height: 160, // Increased margin for better spacing
        borderRadius: 16, // More modern rounded corners
        backgroundColor: '#ffffff', // White background
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5, // Android shadow
        transform: [{ scale: 0.98 }], // Slightly smaller scale for elegant look
    },
    carouselImageContainer: {
        padding: 8, // Inner padding
        backgroundColor: '#ffffff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: primaryColor,
        backgroundColor: primaryColor,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    headerTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'Ephesis-Regular',
        color: secondaryColor
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 62,
        color: secondaryColor
    },
    infoButton: {
        position: 'absolute',
        right: 20,
        top: 62,
        color: secondaryColor,
    },

    selectedImagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
        gap: 5,
    },
    selectedImage: {
        width: '45%',
        aspectRatio: 1,
        borderRadius: 10,
        borderColor: primaryColor,
        borderWidth: 2,
    },
    buttonContainer: {
        marginVertical: 10,
    },
    carouselContainer: {
        marginVertical: 10,
    },
    lastButtonContainer: {
        marginBottom: 5,
    },
});
  