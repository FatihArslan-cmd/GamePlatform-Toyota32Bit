import { useState, useEffect, useCallback } from 'react';
import { Share } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTheme } from 'react-native-paper';
import * as FriendService from '../services/service';

const useFriendsPage = () => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [friendCode, setFriendCode] = useState('');
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [friendModalVisible, setFriendModalVisible] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [searchText, setSearchText] = useState('');

    const fetchFriendsList = useCallback(async () => {
        setError('');
        try {
            const data = await FriendService.fetchFriends();
            setFriends(data.friends);
        } catch (err) {
            setError(err.message || 'Failed to fetch friends');
        }
    }, []); // fetchFriendsList is memoized as it's used in useEffect

    useEffect(() => {
        fetchFriendsList();
    }, [fetchFriendsList]); // Dependency array includes the memoized fetchFriendsList

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
        setSnackbarMessage('Code copied to clipboard');
        setSnackbarVisible(true);
    }, [friendCode]); // Dependency array includes friendCode

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
        handleModalDismiss(); // Using memoized handleModalDismiss
    }, [friendCode, handleModalDismiss]); // Dependency array includes friendCode and handleModalDismiss

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
            await fetchFriendsList(); // Using memoized fetchFriendsList
             setSnackbarMessage('Friend Removed Successfully!');
              setSnackbarVisible(true);
        } catch (err) {
            setError(err.message || 'Failed to remove friend.');
        } finally {
            setLoading(false);
        }
    }, [selectedFriend, fetchFriendsList]); // Dependency array includes selectedFriend and fetchFriendsList

    const handleAddFriend = useCallback(async (code) => {
        setLoading(true);
        setError('');
        try {
            await FriendService.addFriend(code);
            await fetchFriendsList(); // Using memoized fetchFriendsList
            setSnackbarMessage('Friend added successfully!');
            setSnackbarVisible(true);
        } catch (err) {
            setError(err.message || 'Failed to add friend.');
        } finally {
            setLoading(false);
        }
    }, [fetchFriendsList]); // Dependency array includes fetchFriendsList

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
        snackbarVisible,
        setSnackbarVisible,
        snackbarMessage,
        setSnackbarMessage,
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