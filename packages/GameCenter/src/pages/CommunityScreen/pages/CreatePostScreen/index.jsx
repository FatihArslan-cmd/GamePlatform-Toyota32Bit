import React, { useEffect, useState } from 'react';
import { Keyboard, Alert,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostHeader from './components/PostHeader';
import PostInput from './components/PostInput';
import PostToolbar from './components/PostToolbar';
import styles from './styles/createPostStyles';
import { createMessageApi } from './service/service';
import { ToastService } from '../../../../context/ToastService';

const CreatePostScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [postText, setPostText] = useState(''); // State for message content
  const [isPosting, setIsPosting] = useState(false); // State to indicate posting in progress

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

  const handlePost = async () => {
    if (isPosting) return; // Prevent multiple posts
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
      Alert.alert("Hata", "Gönderi oluşturulamadı: " + error.message);
      console.error("Post creation error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <PostHeader navigation={navigation} onPost={handlePost} isPosting={isPosting} /> {/* Pass handlePost and isPosting */}
      <PostInput selectedImage={selectedImage} setSelectedImage={setSelectedImage} postText={postText} setPostText={setPostText} /> {/* Pass postText and setPostText */}
      <PostToolbar setSelectedImage={setSelectedImage} />
    </View>
  );
};

export default CreatePostScreen;