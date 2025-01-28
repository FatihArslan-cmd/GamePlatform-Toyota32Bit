import { useState, useEffect } from 'react';
import { Share } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTheme } from 'react-native-paper';
import { getToken } from '../../../shared/states/api';

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
    const [searchText, setSearchText] = useState(''); // Arama metni için state


    const handleInvitePress = async () => {
        setLoading(true);
        setError('');
        try {
            const token = await getToken();
            const response = await fetch('http://10.0.2.2:3000/api/generate-friend-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();
            if (response.ok) {
                setFriendCode(data.friendCode);
                setModalVisible(true);
            } else {
                setError(data.message || 'Failed to generate code.');
            }
        } catch (err) {
            setError('Failed to connect to the server.');
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

     const fetchFriends = async () => {
        setError('');
        try {
            const token = await getToken();
            const response = await fetch('http://10.0.2.2:3000/api/friends', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                setFriends(data.friends);
            } else {
                setError(data.message || 'Failed to fetch friends');
            }
        } catch (err) {
        }
    };

    useEffect(() => {
        fetchFriends();
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
            const token = await getToken();
            const response = await fetch(`http://10.0.2.2:3000/api/remove-friend/${selectedFriend.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();
            if (response.ok) {
                setFriendModalVisible(false);
                setSelectedFriend(null);
                fetchFriends();
            } else {
                setError(data.message || 'Failed to remove friend.');
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    const handleAddFriend = async (code) => {
        setLoading(true);
        setError('');
        try {
            const token = await getToken();
            const response = await fetch('http://10.0.2.2:3000/api/add-friend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ friendCode: code }),
            });

            const data = await response.json();
            if (response.ok) {
              fetchFriends();
                setSnackbarMessage('Friend added successfully!');
                setSnackbarVisible(true)
            } else {
                setError(data.message || 'Failed to add friend.');
            }
        } catch (err) {
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
        fetchFriends,
        handleFriendPress,
        handleFriendModalDismiss,
        handleRemoveFriend,
        handleAddFriend,
        handleSearchChange
    };
};

export default useFriendsPage;