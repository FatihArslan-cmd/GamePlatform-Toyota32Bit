import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableRipple } from 'react-native-paper';
import FastImage from 'react-native-fast-image'; // Import FastImage

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
    <TouchableRipple
      style={styles.imagePicker}
      onPress={handleImagePick}
    >
      {imageUri ? (
        <FastImage 
          source={{ uri: imageUri, priority: FastImage.priority.high }} // Add priority for better caching
          style={styles.imagePreview}
          resizeMode={FastImage.resizeMode.cover} 
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Icon name="image-plus" size={60} color="#666" />
          <Text style={styles.imagePickerText}>Select Image</Text>
        </View>
      )}
    </TouchableRipple>
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