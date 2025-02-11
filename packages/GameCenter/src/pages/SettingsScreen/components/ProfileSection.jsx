import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Card, TouchableRipple } from 'react-native-paper';
import { useUser } from '../../../context/UserContext';
import GrandientText from '../../../components/GrandientText';
import LogoutButton from './LogOutButton';
const ProfileSection = () => {
  const { user } = useUser();


  return (
    <Card style={styles.card}>
      <TouchableRipple onPress={() => {/* Navigate to profile edit */}}>
        <Card.Content style={styles.content}>
          <View style={styles.profileInfo}>
            <Avatar.Image
              source={{ uri: user?.profilePhoto }}
              size={75}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <GrandientText
                text={user?.username?.toUpperCase() || 'USERNAME'}
                colors={['#4A00E0', '#FF8C00']}
                textStyle={styles.usernameText}
                gradientDirection="horizontal"
                textAlignment={{ // Override default textAlignment to align right
                  justifyContent: 'flex-end', // Align content to the end (right in row)
                  alignItems: 'center',       // Vertically center
                }}
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
  },
  card: {
    elevation: 4,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Take available space to push text to the right
  },
  avatar: {
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
    marginLeft:15,    // Take available space within profileInfo
    alignItems: 'flex-start', // Align items to the end of userInfo container
  },
  usernameText: {
    fontSize: 26,
    includeFontPadding: false,
  },
});

export default ProfileSection;