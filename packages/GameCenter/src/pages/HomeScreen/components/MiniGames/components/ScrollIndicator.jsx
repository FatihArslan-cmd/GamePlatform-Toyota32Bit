import LinearGradient from "react-native-linear-gradient";
import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const ScrollIndicator = ({ scrollProgress }) => {
    const { colors } = useTheme(); 
    const themedStyles = useStyles(colors); 

    const progressBarWidth = scrollProgress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    const gradientColors = [
        '#FF5733', // Kırmızımsı Turuncu
        '#FFC300', // Parlak Sarı
        '#DAF7A6', // Açık Limon Yeşili
        '#90EE90', // Açık Yeşil
        '#00FF7F', // Çimen Yeşili
        '#00CED1', // Koyu Turkuaz
        '#4682B4', // Çelik Mavisi
        '#6A5ACD', // Slate Mavisi
        '#9400D3', // Koyu Mor
        '#FF1493', // Derin Pembe
    ];


    return (
        <View style={themedStyles.progressContainer}>
            <Animated.View
                style={[
                    themedStyles.progressBar,
                    {
                        width: progressBarWidth,
                        overflow: 'hidden',
                    }
                ]}
            >
                <LinearGradient
                    colors={gradientColors}
                    style={{ height: '100%' }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </Animated.View>
        </View>
    );
};

const useStyles = (colors) => StyleSheet.create({
    progressContainer: {
        height: TABLET_DEVICE ? 4 : 2,
        backgroundColor: colors.border, 
        borderRadius: 2,
        marginHorizontal: 20,
        marginVertical: TABLET_DEVICE ? 12 : 8,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
    },
});

export default ScrollIndicator;