import BackButton from "../../../components/BackIcon";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { List, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";
import { useChat } from "../context/ChatContext";

const TABLET_DEVICE = isTablet();

const ChatHeader = () => {
    const { friend } = useChat();
    const { colors } = useTheme();
    const { t } = useTranslation();

    const getStatusText = () => friend.isOnline ? t('chatWithFriends.online') : t('chatWithFriends.offline');
    const getStatusColor = () => friend.isOnline ? 'green' : 'red';


    return (
        <View style={[styles.header, {
            backgroundColor: colors.card,
            borderBottomColor: colors.border
        }]}>
            <BackButton left={0} top={18} />
            <View style={styles.contentContainer}>
                <List.Item
                    title={friend.username}
                    titleStyle={[styles.headerTitle, { color: colors.text }]}
                    description={getStatusText()}
                    descriptionStyle={[styles.headerSubtitle, { color: getStatusColor() }]}
                    left={() => (
                        <View style={styles.avatarContainer}>
                            {friend.profilePhoto ? (
                                <FastImage
                                    style={styles.avatar}
                                    source={{ uri: friend.profilePhoto }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            ) : (
                                <View style={[styles.avatar, styles.avatarPlaceholder, {
                                    backgroundColor: colors.border
                                }]} />
                            )}
                        </View>
                    )}
                    right={() => (
                        <TouchableRipple style={styles.headerButton}>
                            <Icon name="ellipsis-vertical" size={TABLET_DEVICE ? 24 : 18} color="#555" />
                        </TouchableRipple>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    contentContainer: {
        flex: 1,
        marginLeft: 40,
        paddingVertical: 5,
    },
    headerTitle: {
        fontSize: TABLET_DEVICE ? 18 : 14,
        fontFamily: 'Orbitron-ExtraBold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: TABLET_DEVICE ? 14 : 12,
        fontFamily: 'Orbitron-ExtraBold',
    },
    avatarContainer: {
        marginRight: 12,
        justifyContent: 'center',
    },
    avatar: {
        width: TABLET_DEVICE ? 50 : 35,
        height: TABLET_DEVICE ? 50 : 35,
        borderRadius: 22.5,
    },
    avatarPlaceholder: {
        backgroundColor: '#ddd',
    },
    headerButton: {
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
});

export default ChatHeader;