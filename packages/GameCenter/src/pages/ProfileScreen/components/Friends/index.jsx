import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Button, TouchableRipple,Text,Tooltip } from 'react-native-paper';
import InputField from '../../../LoginScreen/components/FormSection/components/InputField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useFriendsPage from './hooks/useFriendsPage';
import styles from '../../styles/FriendPageStyles';
import FriendAddModal from './components/FriendModals/FriendAddModal';
import FriendItem from './components/FrientItem';
import InviteModal from './components/FriendModals/InviteModal';
import FriendDetailsModal from './components/FriendModals/FriendDetailsModal';
import EmptyState from '../../../../components/EmptyState';
import { ToastService } from '../../../../context/ToastService';
import { useButtons } from '../context/ButtonsContext'; 
import {useTheme} from '../../../../context/ThemeContext';

const FriendsPage = () => {
    const {
        modalVisible,
        friendCode,
        loading,
        error,
        friends,
        selectedFriend,
        friendModalVisible,
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
    const { handleFriendCountChange } = useButtons(); 
    const { colors } = useTheme();

    const [addModalVisible, setAddModalVisible] = useState(false);

    useEffect(() => {
        handleFriendCountChange(friends.length);
    }, [friends, handleFriendCountChange]); 

    const handleOpenAddModal = () => {
        setAddModalVisible(true);
    };

    const handleCloseAddModal = () => {
        setAddModalVisible(false);
    };

    useEffect(() => {
        if (error) {
            ToastService.show("error", error);
        }
    }, [error]);


    return (
        <View style={styles.container}>
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
                        <Tooltip title='Add friends' >
                        <TouchableRipple onPress={handleOpenAddModal}>
                            <Icon name="plus" size={28} color={colors.primary} />
                        </TouchableRipple>
                        </Tooltip>
                    )}
                />
            </View>

            <FriendAddModal
                visible={addModalVisible}
                onDismiss={handleCloseAddModal}
                onAddFriend={handleAddFriend}
                setAddModalVisible={setAddModalVisible}
            />
            <Button
                mode="contained"
                style={[styles.inviteButton, { backgroundColor: `${colors.primary}` }]}
                buttonColor={colors.primary}
                labelStyle={[styles.inviteButtonText, { color: 'white', opacity: 0.80, fontFamily:'Orbitron-ExtraBold' }]}
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
                ListEmptyComponent={() => <EmptyState textColor={colors.text} message={"No friends Yet!"}/>}
            />
        </View>
    );
};


export default FriendsPage;