import React from 'react';
import { View, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { useLobbyInvite } from '../context/LobbyInviteContext';
import LoadingIndicator from '../../../components/LoadingIndicator';
import EmptyState from '../../../components/EmptyState';
import InviteCard from '../components/InviteCard';
import { pageStyles } from '../styles/InvitationsPageStyles'; // Import styles specific to Page
import BackButton from '../../../components/BackIcon';

const Page = () => {
  const { invitations, loading, handleAcceptInvite, handleRejectInvite } = useLobbyInvite();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={pageStyles.safeArea}>
        <BackButton />
        <ImageBackground
          source={require('../../../locales/bgImages/darkblurredimage.jpg')}
          style={pageStyles.backgroundImage}
          resizeMode="cover"
        >
          {loading ? (
            <View style={pageStyles.container}>
              <LoadingIndicator size={48} />
            </View>
          ) : !invitations || invitations.length === 0 ? (
            <View style={pageStyles.container}>
              <EmptyState
                message="Şu anda aktif bir davetiniz bulunmuyor."
              />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={pageStyles.container}
              showsVerticalScrollIndicator={false}
            >
              {invitations.map((invite, index) => (
                <InviteCard
                  key={invite.lobbyCode}
                  invite={invite}
                  onAccept={handleAcceptInvite}
                  onReject={handleRejectInvite}
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