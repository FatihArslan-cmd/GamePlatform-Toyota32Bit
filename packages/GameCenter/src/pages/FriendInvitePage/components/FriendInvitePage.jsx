import EmptyState from "../../../components/EmptyState";
import FadeIn from "../../../components/Animations/FadeInAnimation";
import FriendList from "./FriendList";
import Header from "../Header/Header";
import LoadingIndicator from "../../../components/LoadingIndicator";
import LobbyInfo from "./LobbyInfo";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useFriendInvite } from "../context/FriendInviteContext";

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
                <View style={[styles.container, { backgroundColor: colors.blurredImageBackground }]}>
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
                <View style={[styles.container, { backgroundColor: colors.blurredImageBackground }]}>
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