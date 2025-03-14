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

const CreatePostScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [postText, setPostText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const { colors } = useTheme();

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
      ToastService.show("error", "Lütfen paylaşmak için bir şeyler yazın veya bir resim seçin.");
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
      ToastService.show("success", "Gönderi başarıyla oluşturuldu.");
    } catch (error) {
      setIsPosting(false);
      ToastService.show("error", error.message || "Gönderi oluşturulurken bir hata oluştu.");
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