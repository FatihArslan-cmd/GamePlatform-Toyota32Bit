import React from 'react';
import { View, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { useLobbyInvite } from '../context/LobbyInviteContext';
import LoadingIndicator from '../../../components/LoadingIndicator';
import EmptyState from '../../../components/EmptyState';
import InviteCard from '../components/InviteCard';
import { pageStyles } from '../styles/InvitationsPageStyles';
import BackButton from '../../../components/BackIcon';
import { useTheme } from '../../../context/ThemeContext';

const Page = () => {
  const { invitations, loading } = useLobbyInvite(); 
  const { colors, resolvedTheme } = useTheme();
  const styles = pageStyles(colors);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle={resolvedTheme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={styles.safeArea}>
        <BackButton />
        <ImageBackground
          source={require('../../../locales/bgImages/darkblurredimage.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {loading ? (
            <View style={styles.container}>
              <LoadingIndicator size={48} color={colors.primary} />
            </View>
          ) : !invitations || invitations.length === 0 ? (
            <View style={styles.container}>
              <EmptyState
                message="Şu anda aktif bir davetiniz bulunmuyor."
                textColor={colors.text}
              />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={styles.container}
              showsVerticalScrollIndicator={false}
            >
              {invitations.map((invite) => (
                <InviteCard
                  key={invite.lobbyCode}
                  invite={invite}
                />
              ))}
            </ScrollView>
          )}
        </ImageBackground>
      </View>
    </>
  );
};

export default Page;