import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';

const GradientText = ({
    text = 'Colorful Text',
    colors = ['#FF6B6B', '#FFD93D'],
    start = { x: 0, y: 0 },
    end = { x: 1, y: 1 },
    fontFamily = 'Orbitron-VariableFont_wght',
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
        fontSize: 28,
    },
   
});

export default memo(GradientText);