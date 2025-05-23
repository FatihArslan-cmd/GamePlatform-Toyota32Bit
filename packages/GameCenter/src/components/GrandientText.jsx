import LinearGradient from "react-native-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { isTablet } from "../utils/isTablet";

const TABLET_DEVICE = isTablet();

const GradientText = ({
    text = 'Colorful Text',
    colors = ['#FF6B6B', '#FFD93D','red','blue','green','purple'],
    start = { x: 0, y: 0 },
    end = { x: 1, y: 1 },
    fontFamily = 'Orbitron-ExtraBold',
    textStyle = {},
    gradientStyle = {},
    backgroundColor,
    textAlignment = {
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientDirection = 'diagonal',
    height = 50, // Default height
    width = 250, // Default width
}) => {
    const gradientDirections = {
        horizontal: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
        vertical: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
        diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
    };

    const selectedDirection = gradientDirections[gradientDirection] || { start, end };

    return (
        <View
            style={[styles.container, textAlignment, { backgroundColor }]}
            accessible
            accessibilityLabel={text}
        >
            <MaskedView
                maskElement={
                    <View style={styles.maskContainer}>
                        <Text style={[styles.text, { fontFamily }, textStyle]}>{text}</Text>
                    </View>
                }
            >
                <LinearGradient
                    colors={colors}
                    start={selectedDirection.start}
                    end={selectedDirection.end}
                    style={[styles.gradient, gradientStyle, { height, width }]} // Apply height and width props
                />
            </MaskedView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    maskContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: TABLET_DEVICE ? 28 : 20,
    },
   
});

export default memo(GradientText);