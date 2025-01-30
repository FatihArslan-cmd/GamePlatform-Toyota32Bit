import React, { useContext } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import GrandientText from '../../../components/GrandientText';
import styles from '../styles/ProfileScreenStyles';
import { UserContext } from '../../../context/UserContext';


const ProfileSection = () => {
const { user } = useContext(UserContext);

if (!user) {
  return null; 
}

return (
  <View style={styles.profileSection}>
    <View style={styles.profileImageContainer}>
      <FastImage
        style={styles.profileImage}
        source={{
          uri: user.profilePhoto,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
    <GrandientText
      text={user.username}
      colors={['#6200ee', '#FFFFFF']}
      textStyle={styles.userNameText}
      height={75}
      width={420}
    />
  </View>
);
};

export default ProfileSection;