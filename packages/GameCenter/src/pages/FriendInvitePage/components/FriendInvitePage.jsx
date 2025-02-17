import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Header from '../Header/Header';
import ErrorComponents from '../../../components/ErrorComponents';
import EmptyState from '../../../components/EmptyState';
import FadeIn from '../../../components/Animations/FadeInAnimation';
import LoadingIndicator from '../../../components/LoadingIndicator';
import FriendList from './FriendList';
import LobbyInfo from './LobbyInfo';
import { useFriendInvite } from '../context/FriendInviteContext';

const FriendInvitePage = () => {
    const {
        friends,
        loading,
        error,
        userLobby,
        lobbyLoading,
        lobbyError,
        noLobbyError,
        handleInvite,
    } = useFriendInvite();

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

    if (noLobbyError) {
        return (
            <ImageBackground
                source={require('../../../locales/bgImages/darkblurredimage.jpg')}
                style={styles.backgroundImage}
            >
                <Header />
                <View style={styles.container}>
                    <View style={styles.centerContainer}>
                        <EmptyState message="Arkadaşları davet etmeden önce bir lobiye katılın." />
                    </View>
                </View>
            </ImageBackground>
        );
    }

    if (!friends || friends.length === 0) {
        return (
            <ImageBackground
                source={require('../../../locales/bgImages/darkblurredimage.jpg')}
                style={styles.backgroundImage}
            >
                <Header />
                <View style={styles.container}>
                    <View style={styles.centerContainer}>
                        <EmptyState message="Arkadaş bulunamadı." />
                    </View>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require('../../../locales/bgImages/darkblurredimage.jpg')}
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