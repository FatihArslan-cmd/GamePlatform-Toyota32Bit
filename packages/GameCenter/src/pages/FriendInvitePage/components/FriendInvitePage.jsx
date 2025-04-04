import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Header from '../Header/Header';
import EmptyState from '../../../components/EmptyState';
import FadeIn from '../../../components/Animations/FadeInAnimation';
import LoadingIndicator from '../../../components/LoadingIndicator';
import FriendList from './FriendList';
import LobbyInfo from './LobbyInfo';
import { useFriendInvite } from '../context/FriendInviteContext';
import { useTheme } from '../../../context/ThemeContext'; 
import {useTranslation} from 'react-i18next';
const FriendInvitePage = () => {
    const {
        friends,
        loading,
        userLobby,
        lobbyLoading,
        noLobbyError,
        handleInvite,
    } = useFriendInvite();
    
    const { colors, resolvedTheme } = useTheme(); 
    const { t } = useTranslation();
    const backgroundImageSource = resolvedTheme === 'dark'
        ? require('../../../locales/bgImages/darkblurredimage.jpg') 
        : require('../../../locales/bgImages/blurredimage.jpg'); 

    if (loading || lobbyLoading) {
        return (
            <View style={[styles.centerContainer, { backgroundColor: colors.background }]}> 
                <LoadingIndicator />
            </View>
        );
    }

    if (noLobbyError) {
        return (
            <ImageBackground
                source={backgroundImageSource} 
                style={styles.backgroundImage}
            >
                <Header />
                <View style={[styles.container, { backgroundColor: colors.blurredImageBackground }]}> {/* Apply theme background color */}
                    <View style={styles.centerContainer}>
                        <EmptyState message={t('friendInvitePage.emptyState1')} />
                    </View>
                </View>
            </ImageBackground>
        );
    }

    if (!friends || friends.length === 0) {
        return (
            <ImageBackground
                source={backgroundImageSource} 
                style={styles.backgroundImage}
            >
                <Header />
                <View style={[styles.container, { backgroundColor: colors.blurredImageBackground }]}> {/* Apply theme background color */}
                    <View style={styles.centerContainer}>
                        <EmptyState textColor={colors.text} message={t('friendInvitePage.emptyState2')} />
                    </View>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={backgroundImageSource}
            style={styles.backgroundImage}
        >
            <Header />
            <View style={[styles.container, { backgroundColor: colors.blurredImageBackground }]}> 
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