import React, { useState } from 'react';
import { StyleSheet, View, Animated, Linking } from 'react-native';
import { Surface, Text, IconButton, TouchableRipple } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastService } from '../../../../../context/ToastService';
import { useTheme } from '../../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; 

const InvitationLink = ({code}) => {
  const [copied, setCopied] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const { t } = useTranslation(); 
  const theme = useTheme();

  const handleCopy = async () => {
    if (!code) return;
    Clipboard.setString(code);

    setCopied(true);
    ToastService.show('success', t('createLobbyModal.invitationLink.copyCode'));
    Animated.sequence([
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        speed: 2,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        delay: 1500,
      }),
    ]).start(() => setCopied(false));
  };

  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });

  const handleShare = (platform) => {
    if (!code) {
      return;
    }

    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(code)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(code)}`;
        break;
      case 'instagram':
        return;
      default:
        return;
    }

    Linking.openURL(url).catch((err) => {
      ToastService.show('error', t('toastMessages.failedToOpenLink')); 
    });
  };

  if (!code) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{t('createLobbyModal.invitationLink.invitationCode')}</Text>
      <Text style={[styles.subtitle, { color: theme.colors.subText }]}>
        {t('createLobbyModal.invitationLink.shareLobbySubtitle')} 
      </Text>

      <LottieView
        source={require('../../../../../locales/lottie/ShareLink.json')}
        autoPlay
        loop={true}
        style={styles.lottieAnimation}
      />

      <Surface style={[styles.linkContainer, { backgroundColor: theme.colors.card }]} elevation={2}>
        <TouchableRipple
          style={styles.linkTouchable}
          onPress={handleCopy}
          activeOpacity={0.7}
        >
          <Animated.View
            style={[
              styles.contentContainer,
              { transform: [{ scale: scaleInterpolate }] },
            ]}
          >
            <View style={styles.linkTextContainer}>
              <IconButton
                icon="link-variant"
                size={24}
                iconColor={useTheme().colors.text}
                style={styles.linkIcon}
              />
              <Text numberOfLines={1} style={[styles.linkText, { color: theme.colors.text }]}>
                {code}
              </Text>
            </View>

            <IconButton
              icon={copied ? 'check' : 'content-copy'}
              size={24}
              iconColor={copied ? useTheme().colors.success : useTheme().colors.primary}
              style={styles.copyIcon}
              onPress={handleCopy}
            />
          </Animated.View>
        </TouchableRipple>
      </Surface>

      <View style={styles.socialIcons}>
        <IconButton
          icon="whatsapp"
          size={48}
          iconColor="#25D366"
          onPress={() => handleShare('whatsapp')}
        />
        <IconButton
          icon="facebook"
          size={48}
          iconColor="#3b5998"
          onPress={() => handleShare('facebook')}
        />
        <IconButton
          icon="instagram"
          size={48}
          iconColor="#C13584"
          onPress={() => handleShare('instagram')}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: 'Orbitron-ExtraBold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    fontFamily:'Orbitron-VariableFont_wght'
  },
  lottieAnimation: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  linkContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  linkTouchable: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  linkTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIcon: {
    margin: 0,
    marginRight: 8,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',

  },
  copyIcon: {
    margin: 0,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default InvitationLink;