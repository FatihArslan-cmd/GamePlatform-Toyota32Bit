import React from 'react';
import { View } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/createPostStyles';

const PostHeader = ({ navigation, onPost, isPosting }) => { // Receive onPost and isPosting props
  return (
    <View style={styles.header}>
      <TouchableRipple
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
        borderless={true}
        rippleColor="rgba(0,0,0,0.1)"
      >
        <Icon name="close" size={28} color="#333" />
      </TouchableRipple>

      <Button
        mode="contained"
        onPress={onPost} // Call the onPost function from props
        style={styles.postButton}
        labelStyle={styles.postButtonLabel}
        loading={isPosting} // Show loading indicator when isPosting is true
        disabled={isPosting} // Disable button when posting
      >
        Post
      </Button>
    </View>
  );
};

export default PostHeader;