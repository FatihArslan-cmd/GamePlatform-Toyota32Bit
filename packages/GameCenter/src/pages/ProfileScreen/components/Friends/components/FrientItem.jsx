import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import styles from "../../../styles/FriendPageStyles";
import { Text, View } from "react-native";
import { Card, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";

const FriendItem = ({ item, onPress }) => {
    const { colors } = useTheme();

    return (
        <TouchableRipple onPress={onPress} rippleColor={colors.ripple}>
            <Card style={[styles.friendCard, { backgroundColor: colors.card }]}>
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