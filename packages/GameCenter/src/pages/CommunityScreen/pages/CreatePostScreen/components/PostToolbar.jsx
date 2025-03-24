import React from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../../../../../context/ThemeContext';
import styles from '../styles/createPostStyles';

const PostToolbar = ({ setSelectedImage }) => {
  const { colors } = useTheme();

  const handleImageSelection = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };
  {[styles.dropdownText, { color: 'black' }]}
  return (
    <View style={[styles.toolbarContainer,{backgroundColor:colors.background}]}>
      <View style={styles.toolbar}>
        <TouchableRipple
          style={styles.toolbarButton}
          borderless={true}
          rippleColor="rgba(0,0,0,0.1)"
          onPress={handleImageSelection}
        >
          <Icon name="image" size={28} color={colors.primary} />
        </TouchableRipple>
        <TouchableRipple
          style={styles.toolbarButton}
          borderless={true}
          rippleColor="rgba(0,0,0,0.1)"
          onPress={() => { /* Handle GIF selection */ }}
        >
          <Icon name="file-gif-box" size={28} color={colors.primary} />
        </TouchableRipple>
        <TouchableRipple
          style={styles.toolbarButton}
          borderless={true}
          rippleColor="rgba(0,0,0,0.1)"
          onPress={() => {  }}
        >
          <Icon name="format-list-bulleted" size={28} color={colors.primary} />
        </TouchableRipple>
        <TouchableRipple
          style={styles.toolbarButton}
          borderless={true}
          rippleColor="rgba(0,0,0,0.1)"
          onPress={() => {  }}
        >
          <Icon name="map-marker" size={28} color={colors.primary} />
        </TouchableRipple>
      </View>
    </View>
  );
};

export default PostToolbar;