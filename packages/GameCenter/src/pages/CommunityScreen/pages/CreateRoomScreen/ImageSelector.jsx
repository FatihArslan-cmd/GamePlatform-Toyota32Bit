import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const ImageSelector = ({ imageUri, onImageSelected, onError }) => {
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
        onError('Image selection failed');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        onImageSelected(response.assets[0].uri);
      }
    });
  };

  return (
    <TouchableOpacity
      style={styles.imagePicker}
      onPress={handleImagePick}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.imagePreview}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Icon name="image-plus" size={60} color="#666" />
          <Text style={styles.imagePickerText}>Select Image</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    height: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    color: '#666',
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    marginTop: 10,
  },
});

export default ImageSelector;