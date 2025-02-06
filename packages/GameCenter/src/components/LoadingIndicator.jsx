import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const LoadingIndicator = ({ size = 'large', color, style }) => {
    const theme = useTheme();
    
    const indicatorColor = color || theme.colors.primary;
    
    return (
        <View style={[styles.container, style]}>
             <ActivityIndicator size={size} color={indicatorColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingIndicator;