import React, { useContext } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Avatar, Card, Text, TextInput, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../../../../../context/UserContext';
import styles from '../styles/createPostStyles';

const PostInput = ({ selectedImage, setSelectedImage, postText, setPostText }) => { // Receive postText and setPostText props
  const { user } = useContext(UserContext);

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={styles.postArea}>
        <View style={styles.userSection}>
          <Avatar.Image size={60} source={{ uri: user.profilePhoto }} style={styles.avatar}               resizeMode="contain"
          />
          <TouchableRipple
            style={styles.dropdownButton}
            borderless={true}
            rippleColor="rgba(0,0,0,0.1)"
            onPress={() => { }}
          >
            <>
              <Text style={styles.dropdownText}>Everyone</Text>
              <Icon name="chevron-down" size={24} color="#1DA1F2" />
            </>
          </TouchableRipple>
        </View>

        <Card.Content style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="What's happening?"
            placeholderTextColor="#657786"
            multiline
            autoFocus={true}
            textAlignVertical="top"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            value={postText} // Control the input value with postText prop
            onChangeText={setPostText} // Update postText state in CreatePostScreen
          />
        </Card.Content>

        {selectedImage && (
          <View style={styles.postMediaContainer}>
            <Image source={{ uri: selectedImage }} style={styles.postMediaImage} />
            <TouchableRipple style={styles.removeMediaButton} onPress={handleRemoveImage}>
              <Icon name="close" size={18} style={styles.removeMediaIcon} />
            </TouchableRipple>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PostInput;