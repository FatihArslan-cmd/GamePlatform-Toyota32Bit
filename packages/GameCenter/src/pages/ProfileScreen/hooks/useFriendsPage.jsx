import { useState, useEffect } from 'react';
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

    const handleInvitePress = async () => {
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
    };

    const handleCopyCode = async () => {
        Clipboard.setString(friendCode);
        setSnackbarMessage('Code copied to clipboard');
        setSnackbarVisible(true);
    };

    const handleModalDismiss = () => {
        setModalVisible(false);
        setFriendCode('');
    };

    const handleShareCode = async () => {
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
    };

    const fetchFriendsList = async () => {
        setError('');
        try {
            const data = await FriendService.fetchFriends();
            setFriends(data.friends);
        } catch (err) {
            setError(err.message || 'Failed to fetch friends');
        }
    };

    useEffect(() => {
        fetchFriendsList();
    }, []);

    const handleFriendPress = (friend) => {
        setSelectedFriend(friend);
        setFriendModalVisible(true);
    };

    const handleFriendModalDismiss = () => {
        setFriendModalVisible(false);
        setSelectedFriend(null);
    };

    const handleRemoveFriend = async () => {
        setLoading(true);
        setError('');
        try {
            await FriendService.removeFriend(selectedFriend.id);
            setFriendModalVisible(false);
            setSelectedFriend(null);
            fetchFriendsList();
             setSnackbarMessage('Friend Removed Successfully!');
              setSnackbarVisible(true);
        } catch (err) {
            setError(err.message || 'Failed to remove friend.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddFriend = async (code) => {
        setLoading(true);
        setError('');
        try {
            await FriendService.addFriend(code);
            fetchFriendsList();
            setSnackbarMessage('Friend added successfully!');
            setSnackbarVisible(true);
        } catch (err) {
            setError(err.message || 'Failed to add friend.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (text) => {
        setSearchText(text);
    };

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