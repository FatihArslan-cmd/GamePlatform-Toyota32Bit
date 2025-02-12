import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostHeader from './components/PostHeader';
import PostInput from './components/PostInput';
import PostToolbar from './components/PostToolbar';
import styles from './styles/createPostStyles';

const CreatePostScreen = ({ navigation }) => {
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
      <PostInput />
      <PostToolbar />
    </SafeAreaView>
  );
};

export default CreatePostScreen;
