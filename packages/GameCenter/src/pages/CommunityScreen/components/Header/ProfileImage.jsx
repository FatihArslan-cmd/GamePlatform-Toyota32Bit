import React, { useContext } from 'react';
import { View } from 'react-native';
import { TouchableRipple,Tooltip } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../../context/UserContext';
import createStyles from './styles';
import { useTheme } from '../../../../context/ThemeContext'; 

const ProfileImage = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const { colors } = useTheme(); 
  const styles = createStyles(colors); 

  return (
    <Tooltip title="Profile">
    <TouchableRipple onPress={() => navigation.navigate('ProfileScreen')}>
      <View style={styles.profileImageContainer}>
        <FastImage
          style={styles.profileImage}
          source={{
            uri: user.profilePhoto,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </TouchableRipple>
    </Tooltip>
  );
};

export default ProfileImage;