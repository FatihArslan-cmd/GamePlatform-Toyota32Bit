import React, { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text,TouchableRipple } from 'react-native-paper';
const { width } = Dimensions.get('window');
const CARD_SPACING = 10;
const CARD_WIDTH = (width - CARD_SPACING * 3) / 2.1;

/**
 * VideoPlayItems component to display a card with an image and title.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - Title of the video/item.
 * @param {string} props.imageUri - URI of the image to display.
 * @param {number} props.index - Index of the item (no longer used for staggered animations).
 * @param {('cover' | 'contain' | 'stretch' | 'repeat' | 'center')} [props.resizeMode='cover'] - Resize mode for the image. Defaults to 'cover'.
 * @param {function} props.onPress - Function to be called when the item is pressed.
 */

const VideoPlayItems = memo(({ title, imageUri, index, resizeMode = 'cover', onPress }) => {

    return (
        <TouchableRipple
            onPress={onPress}
            style={styles.pressable}
        >
            <View
                style={styles.cardContainer}
            >
                <FastImage
                    style={styles.image}
                    source={{ uri: imageUri }}
                    resizeMode={resizeMode} 
                />
                <View
                    style={styles.overlay}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
                </View>
            </View>
        </TouchableRipple>
    );
});


const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    pressable: {
        marginBottom: CARD_SPACING,
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: 200,
        borderRadius: 30,
        backgroundColor: '#fff',
        elevation: 5,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        opacity: 0, // Keep overlay but without animation, set opacity to 0 if not needed
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
    },
    titleText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Orbitron-VariableFont_wght',
        textAlign: 'center',
    },
});

export default VideoPlayItems