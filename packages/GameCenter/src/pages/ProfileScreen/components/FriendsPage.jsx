import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Button, Snackbar, TouchableRipple } from 'react-native-paper';
import InputField from '../../LoginScreen/components/FormSectionItem/InputField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useFriendsPage from '../hooks/useFriendsPage';
import styles from '../styles/FriendPageStyles';
import FriendAddModal from './Modals/FriendAddModal';
import FriendItem from './FrientItem';
import InviteModal from './Modals/InviteModal';
import FriendDetailsModal from './Modals/FriendDetailsModal';


const FriendsPage = ({ onFriendCountChange }) => {
    const {
        colors,
        modalVisible,
        friendCode,
        loading,
        error,
        friends,
        selectedFriend,
        friendModalVisible,
        snackbarVisible,
        snackbarMessage,
        setSnackbarVisible,
        handleInvitePress,
        handleCopyCode,
        handleModalDismiss,
        handleShareCode,
        handleFriendPress,
        handleFriendModalDismiss,
        handleRemoveFriend,
        handleAddFriend,
        handleSearchChange
    } = useFriendsPage();

    const [addModalVisible, setAddModalVisible] = useState(false);

    useEffect(() => {
        if (onFriendCountChange) {
            onFriendCountChange(friends.length);
        }
    }, [friends, onFriendCountChange]);

    const handleOpenAddModal = () => {
        setAddModalVisible(true);
    };

    const handleCloseAddModal = () => {
        setAddModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}
            <InviteModal 
                visible={modalVisible}
                onDismiss={handleModalDismiss}
                friendCode={friendCode}
                onCopyCode={handleCopyCode}
                onShareCode={handleShareCode}
                colors={colors}
            />
            <FriendDetailsModal
                visible={friendModalVisible}
                onDismiss={handleFriendModalDismiss}
                selectedFriend={selectedFriend}
                onRemoveFriend={handleRemoveFriend}
            />
            <View style={styles.searchContainer}>
                <InputField
                    label="Search friends"
                    leftIcon="magnify"
                    style={styles.input}
                    onChangeText={handleSearchChange}
                    rightIcon={() => (
                        <TouchableRipple onPress={handleOpenAddModal}>
                            <Icon name="plus" size={28} color={colors.primary} />
                        </TouchableRipple>
                    )}
                />
            </View>
            <FriendAddModal
                visible={addModalVisible}
                onDismiss={handleCloseAddModal}
                onAddFriend={handleAddFriend}
            />
            <Button
                mode="contained"
                style={[styles.inviteButton, { backgroundColor: `${colors.primary}70` }]}
                buttonColor={colors.primary}
                labelStyle={[styles.inviteButtonText, { color: 'white', opacity: 0.80 }]}
                icon={() => <Icon name="link-variant" color='white' size={24} />}
                iconPosition="trailing"
                onPress={handleInvitePress}
                loading={loading}
                disabled={loading}
            >
                Get a link to invite users
            </Button>
            <FlatList
                data={friends}
                renderItem={({ item }) => (
                  <FriendItem 
                    item={item} 
                    colors={colors} 
                    onPress={() => handleFriendPress(item)} 
                />
                )}
                keyExtractor={(item) => item.id.toString()}
                style={styles.friendsList}
                ListEmptyComponent={() => <Text style={styles.emptyListText}>No friends yet.</Text>}
            />
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={[styles.snackbar, { backgroundColor: colors.primary }]}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
};

export default FriendsPage;