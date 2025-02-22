import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List ,TouchableRipple} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../../../components/BackIcon';

const ChatHeader = ({ friend, onMoreActions }) => {
    const getStatusText = () => {
        return friend.isOnline ? 'Online' : 'Offline';
    };
    const getStatusColor = () => {
        return friend.isOnline ? 'green' : 'red';
    };

    return (
        <View style={styles.header}>
            <BackButton left={0} top={18} />
            <View style={styles.contentContainer}>
                <List.Item
                    title={friend.username}
                    titleStyle={styles.headerTitle}
                    description={getStatusText()}
                    descriptionStyle={[styles.headerSubtitle, { color: getStatusColor() }]}
                    left={() => (
                        <View style={styles.avatarContainer}>
                            {friend.profilePhoto ? (
                                <FastImage
                                    style={styles.avatar}
                                    source={{
                                        uri: friend.profilePhoto,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            ) : (
                                <View style={[styles.avatar, styles.avatarPlaceholder]} />
                            )}
                        </View>
                    )}
                    right={() => (
                        <TouchableRipple style={styles.headerButton} onPress={onMoreActions}>
                            <Icon name="ellipsis-vertical" size={24} color="#555" />
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
        fontSize: 18,
        fontFamily: 'Orbitron-ExtraBold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 14,
        fontFamily: 'Orbitron-ExtraBold',
    },
    avatarContainer: {
        marginRight: 12,
        justifyContent: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
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