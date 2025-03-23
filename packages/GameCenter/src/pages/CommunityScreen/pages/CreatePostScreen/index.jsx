import React, { useEffect, useState } from 'react';
import { Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostHeader from './components/PostHeader';
import PostInput from './components/PostInput';
import PostToolbar from './components/PostToolbar';
import createPostStyles from './styles/createPostStyles';
import { createMessageApi } from './service/service';
import { ToastService } from '../../../../context/ToastService';
import { useTheme } from '../../../../context/ThemeContext';
import styles from './styles/createPostStyles';
import {useTranslation} from 'react-i18next'; // Import useTranslation

const CreatePostScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [postText, setPostText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const { colors } = useTheme();
  const { t } = useTranslation(); // Use useTranslation hook

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const handlePost = async () => {
    if (isPosting) return;
    setIsPosting(true);

    if (!postText.trim() && !selectedImage) {
      ToastService.show("error", t('communityScreen.emptyPostError')); // Use translation key - changed to communityScreen
      setIsPosting(false);
      return;
    }

    try {
      const messageData = {
        content: postText.trim(),
        contentImage: selectedImage || null,
      };
      await createMessageApi(messageData);
      setIsPosting(false);
      navigation.goBack();
      ToastService.show("success", t('communityScreen.postSuccess')); // Use translation key - changed to communityScreen
    } catch (error) {
      setIsPosting(false);
      ToastService.show("error", error.message || t('communityScreen.postError')); // Use translation key - changed to communityScreen
      console.error("Post creation error:", error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PostHeader navigation={navigation} onPost={handlePost} isPosting={isPosting} colors={colors} />
      <PostInput selectedImage={selectedImage} setSelectedImage={setSelectedImage} postText={postText} setPostText={setPostText} colors={colors} />
      <PostToolbar setSelectedImage={setSelectedImage} colors={colors} />
    </SafeAreaView>
  );
};

export default CreatePostScreen;