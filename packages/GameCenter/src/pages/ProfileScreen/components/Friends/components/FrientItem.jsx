import React from 'react';
import { View, Text } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import styles from '../../../styles/FriendPageStyles';
import { useTheme } from '../../../../../context/ThemeContext';

const FriendItem = ({ item, onPress }) => {
    const { colors } = useTheme();
    return (
        <TouchableRipple onPress={onPress}>
            <Card style={styles.friendCard}>
                <View style={styles.friendCardContent}>
                    {item.profilePhoto ? (
                        <FastImage
                            source={{ uri: item.profilePhoto, priority: FastImage.priority.normal }}
                            style={styles.profilePhoto}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    ) : (
                        <Icon name="account-circle" size={40} color={colors.primary} style={{ marginRight: 10 }} />
                    )}
                    <Text style={[styles.friendName, { color: colors.text }]}>{item.username}</Text>
                </View>
            </Card>

        </TouchableRipple>
    );
};

export default FriendItem;