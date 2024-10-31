import { StyleSheet } from 'react-native';

export const appBackgroundColor = '#D99177';
export const darkBlue = '#364259'
export const lightGray = '#BFBFBF'

export const styles = StyleSheet.create({
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
        borderColor: darkBlue,
        borderRadius: 2,
        borderWidth: 2
    },
    generalButton: {
        backgroundColor: darkBlue,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    generalButtonText: {
        color: lightGray,
        fontSize: 16,
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
        height: 170,
    },
    carouselContent: {
        paddingBottom: 0,
    },
    carouselImage: {
        width: 160,
        height: 160,
        marginRight: 10,
        borderColor: darkBlue,
        borderRadius: 2,
        borderWidth: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: darkBlue,
        backgroundColor: darkBlue,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: lightGray
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 62,
        color: lightGray
    },
    infoButton: {
        position: 'absolute',
        right: 20,
        top: 62,
        color: lightGray,
    },
});
  