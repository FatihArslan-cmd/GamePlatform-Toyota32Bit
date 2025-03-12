import React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
import { useUser } from '../../../context/UserContext';
import GrandientText from '../../../components/GrandientText';
import LogoutButton from './LogOutButton';
import { useTheme } from '../../../context/ThemeContext';

const ProfileSection = () => {
  const { user } = useUser();
  const { colors } = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: colors.card }]}>
      <TouchableRipple>
        <Card.Content style={[styles.content, { backgroundColor: colors.card }]}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: user?.profilePhoto }}
              style={[styles.avatar, { borderRadius: 37.5 }]}
            />
            <View style={styles.userInfo}>
              <GrandientText
                text={user?.username?.toUpperCase() || 'USERNAME'}
                colors={colors.usernameGradient}
                textStyle={[styles.usernameText, { color: colors.text }]}
                gradientDirection="horizontal"
                width={100}
              />
            </View>
          </View>
          <LogoutButton showText={false} showChevron={false} />
        </Card.Content>
      </TouchableRipple>
    </Card>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
  },
  card: {
    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginRight: 8,
    width: 75,
    height: 75,
  },
  userInfo: {
    flex: 1,
    marginLeft:15,
    alignItems: 'flex-start',
  },
  usernameText: {
    fontSize: 26,
    includeFontPadding: false,
  },
});

export default ProfileSection;