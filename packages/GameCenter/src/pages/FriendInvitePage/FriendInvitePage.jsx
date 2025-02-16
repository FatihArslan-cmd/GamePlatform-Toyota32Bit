import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { fetchFriends } from '../ProfileScreen/services/service';
import Header from './Header/Header';
import ErrorComponents from '../../components/ErrorComponents';
import EmptyState from '../../components/EmptyState';
import { ToastService } from '../../context/ToastService';
import FadeIn from '../../components/Animations/FadeInAnimation';
import lobbyService from '../HomeScreen/components/Header/services/lobbyService';
import LoadingIndicator from '../../components/LoadingIndicator';
import FriendList from './components/FriendList';
import LobbyInfo from './components/LobbyInfo';

const FriendInvitePage = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userLobby, setUserLobby] = useState(null);
    const [lobbyLoading, setLobbyLoading] = useState(true);
    const [lobbyError, setLobbyError] = useState('');

    useEffect(() => {
        const loadFriendsAndLobby = async () => {
            setLoading(true);
            setLobbyLoading(true);
            setError('');
            setLobbyError('');
            try {
                const friendsData = await fetchFriends();
                setFriends(friendsData.friends);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

            try {
                const lobbyData = await lobbyService.getUserLobby();
                setUserLobby(lobbyData);
            } catch (err) {
                setLobbyError(err.message);
                setUserLobby(null);
            } finally {
                setLobbyLoading(false);
            }
        };

        loadFriendsAndLobby();
    }, []);

    const handleInvite = (friendId) => {
        ToastService.show('success', 'Friend invite request sent!');
        console.log(`Inviting friend with ID: ${friendId}`);
    };

    if (loading || lobbyLoading) {
        return (
            <View style={styles.centerContainer}>
                <LoadingIndicator />
            </View>
        );
    }

    if (error || lobbyError) {
        return (
            <View style={styles.centerContainer}>
                <ErrorComponents errorMessage={error || lobbyError} />
            </View>
        );
    }

    if (!friends || friends.length === 0) {
        return (
            <ImageBackground
                source={require('../../locales/bgImages/darkblurredimage.jpg')}
                style={styles.backgroundImage}
            >
                <Header />
                <View style={styles.container}>
                    <View style={styles.centerContainer}>
                        <EmptyState message="No friends found." />
                    </View>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require('../../locales/bgImages/darkblurredimage.jpg')}
            style={styles.backgroundImage}
        >
            <Header />
            <View style={styles.container}>
                {userLobby && (
                    <LobbyInfo userLobby={userLobby} />
                )}
                <FadeIn>
                    <FriendList friends={friends} handleInvite={handleInvite} />
                </FadeIn>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({ 
    backgroundImage: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FriendInvitePage;