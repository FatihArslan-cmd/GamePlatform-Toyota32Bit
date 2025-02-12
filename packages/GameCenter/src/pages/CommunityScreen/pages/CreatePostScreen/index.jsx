// CreatePostScreen.js
import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostHeader from './components/PostHeader';
import PostInput from './components/PostInput';
import PostToolbar from './components/PostToolbar';
import styles from './styles/createPostStyles';

const CreatePostScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Handle keyboard show if needed
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PostHeader navigation={navigation} />
      <PostInput selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      <PostToolbar setSelectedImage={setSelectedImage} />
    </SafeAreaView>
  );
};

export default CreatePostScreen;