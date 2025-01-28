import React from 'react';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import styles from '../styles/ProfileScreenStyles';

const TopBar = () => {
    return (
        <View style={styles.topBar}>
            <IconButton icon="pencil" size={24} iconColor="#a5a7ac" style={styles.topBarIcon} />
            <Text style={styles.title}>Profile</Text>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                <IconButton icon="sync" size={24} iconColor="#a5a7ac" style={styles.topBarIcon} />
                <IconButton icon="dots-vertical" size={24} iconColor="#a5a7ac" style={styles.topBarIcon} />
            </View>
        </View>
    );
};

export default TopBar;