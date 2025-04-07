import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Text, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";
import { useCreateRoom } from "../context/CreateRoomContext";

const TABLET_DEVICE = isTablet();

const ImageSelector = () => {
  const { imageUri, setImageUri } = useCreateRoom();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: TABLET_DEVICE ? 300 : 200,
      maxWidth: TABLET_DEVICE ? 300 : 200,

    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.error) {
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
          <Icon name="image-plus" size={TABLET_DEVICE ? 60 : 30} color={colors.subText} />
          <Text style={[styles.imagePickerText, {color: colors.subText}]}>
            {t('communityScreen.Select Image')}
          </Text>
        </View>
      )}
    </TouchableRipple>
  );
};

const createStyles = () => StyleSheet.create({
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
    fontSize: TABLET_DEVICE ? 16 : 12,
    fontFamily: 'Orbitron-ExtraBold',
    marginTop: 10,
  },
});

export default ImageSelector;