import { useState, useEffect, useCallback } from 'react';
import { Share } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTheme } from 'react-native-paper';
import * as FriendService from '../services/service';
import { ToastService } from '../../../context/ToastService';

const useFriendsPage = () => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [friendCode, setFriendCode] = useState('');
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [friendModalVisible, setFriendModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const fetchFriendsList = useCallback(async () => {
        setError('');
        try {
            const data = await FriendService.fetchFriends();
            setFriends(data.friends);
        } catch (err) {
            console.log("Error fetching friends:", err);
            setError(err.message || 'Failed to fetch friends');
        }
    }, []);

    useEffect(() => {
        fetchFriendsList();
    }, [fetchFriendsList]);

    const handleInvitePress = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await FriendService.generateFriendCode();
            setFriendCode(data.friendCode);
            setModalVisible(true);
        } catch (err) {
            setError(err.message || 'Failed to generate code.');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCopyCode = useCallback(async () => {
        Clipboard.setString(friendCode);
        setModalVisible(false);
        ToastService.show("success", 'Code copied to clipboard'); // Show toast
    }, [friendCode]);

    const handleModalDismiss = useCallback(() => {
        setModalVisible(false);
        setFriendCode('');
    }, []);

    const handleShareCode = useCallback(async () => {
        try {
            const shareOptions = {
                message: `Here is my friend code: ${friendCode}`,
            };
            await Share.share(shareOptions);
        } catch (error) {
            console.log("Error sharing code:", error);
            setError("Failed to share code");
        }
        handleModalDismiss();
    }, [friendCode, handleModalDismiss]);

    const handleFriendPress = useCallback((friend) => {
        setSelectedFriend(friend);
        setFriendModalVisible(true);
    }, []);

    const handleFriendModalDismiss = useCallback(() => {
        setFriendModalVisible(false);
        setSelectedFriend(null);
    }, []);

    const handleRemoveFriend = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            await FriendService.removeFriend(selectedFriend.id);
            setFriendModalVisible(false);
            setSelectedFriend(null);
            await fetchFriendsList();
             ToastService.show("success", 'Friend Removed Successfully!'); // Show toast
             setModalVisible(false);

        } catch (err) {
            setError(err.message || 'Failed to remove friend.');
        } finally {
            setLoading(false);
        }
    }, [selectedFriend, fetchFriendsList]);

    const handleAddFriend = useCallback(async (code) => {
        setLoading(true);
        setError('');
        try {
            await FriendService.addFriend(code);
            await fetchFriendsList();
            handleModalDismiss();
            ToastService.show("success", 'Friend added successfully!'); // Show toast
        } catch (err) {
            setError(err.message || 'Failed to add friend.');
        } finally {
            setLoading(false);
        }
    }, [fetchFriendsList]);

    const handleSearchChange = useCallback((text) => {
        setSearchText(text);
    }, []);

    return {
        colors,
        modalVisible,
        setModalVisible,
        friendCode,
        setFriendCode,
        friends,
        setFriends,
        loading,
        setLoading,
        error,
        setError,
        selectedFriend,
        setSelectedFriend,
        friendModalVisible,
        setFriendModalVisible,
        handleInvitePress,
        handleCopyCode,
        handleModalDismiss,
        handleShareCode,
        fetchFriends: fetchFriendsList,
        handleFriendPress,
        handleFriendModalDismiss,
        handleRemoveFriend,
        handleAddFriend,
        handleSearchChange
    };
};

export default useFriendsPage;