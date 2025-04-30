import BackButton from "../../../components/BackIcon";
import EmptyState from "../../../components/EmptyState";
import Header from "../components/Header/Header";
import InviteCard from "../components/InviteCard";
import LoadingIndicator from "../../../components/LoadingIndicator";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, ScrollView, StatusBar, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useLobbyInvite } from "../context/LobbyInviteContext";
import { pageStyles } from "../styles/InvitationsPageStyles";

const Page = () => {
  const { invitations, loading } = useLobbyInvite();
  const { colors, resolvedTheme } = useTheme();
  const styles = pageStyles(colors);
  const { t } = useTranslation();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle={resolvedTheme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={styles.safeArea}>
        <Header />

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
                message={t('personalMessagePage.noActiveInvites')}
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
