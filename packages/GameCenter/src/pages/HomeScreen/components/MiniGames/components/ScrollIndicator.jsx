import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ScrollIndicator = ({ scrollProgress }) => {
    const progressBarWidth = scrollProgress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    const colors = [
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
        <View style={styles.progressContainer}>
            <Animated.View
                style={[
                    styles.progressBar,
                    {
                        width: progressBarWidth,
                        overflow: 'hidden', // Gradientin taşmasını engellemek için
                    }
                ]}
            >
                <LinearGradient
                    colors={colors}
                    style={{ height: '100%' }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressContainer: {
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        marginHorizontal: 20,
        marginTop: 12,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden', 
    },
});

export default ScrollIndicator;