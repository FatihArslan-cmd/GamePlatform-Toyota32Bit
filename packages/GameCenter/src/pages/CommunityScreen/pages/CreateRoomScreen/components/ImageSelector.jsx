import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import { useCreateRoom } from '../context/CreateRoomContext';
import { useTheme } from '../../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ImageSelector = () => {
  const { imageUri, setImageUri } = useCreateRoom();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.error) {
        console.error('Image selection failed');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <TouchableRipple style={[styles.imagePicker, {backgroundColor: colors.card, borderColor: colors.border}]} onPress={handleImagePick}>
      {imageUri ? (
        <FastImage
          source={{ uri: imageUri, priority: FastImage.priority.high }}
          style={styles.imagePreview}
          resizeMode={FastImage.resizeMode.contain}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Icon name="image-plus" size={60} color={colors.subText} />
          <Text style={[styles.imagePickerText, {color: colors.subText}]}>
            {t('communityScreen.Select Image')}
          </Text>
        </View>
      )}
    </TouchableRipple>
  );
};

const createStyles = (colors) => StyleSheet.create({
  imagePicker: {
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    marginTop: 10,
  },
});

export default ImageSelector;