import FastImage from "react-native-fast-image";
import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const { width } = Dimensions.get('window');
const CARD_SPACING = 10;
const CARD_WIDTH = (width - CARD_SPACING * 3) / 2.1;

const VideoPlayItems = memo(({ title, imageUri, index, resizeMode = 'cover', onPress }) => {
    const { colors } = useTheme(); 
    const styles = createStyles(colors); 

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


const createStyles = (colors) => StyleSheet.create({
    pressable: {
        marginBottom: CARD_SPACING,
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: TABLET_DEVICE ? 200 : 150,
        borderRadius: 30,
        backgroundColor: colors.card, // Use theme card color
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
        opacity: 0,
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
        fontSize: TABLET_DEVICE ? 14 : 11,
        fontFamily: 'Orbitron-VariableFont_wght',
        textAlign: 'center',
    },
});

export default VideoPlayItems