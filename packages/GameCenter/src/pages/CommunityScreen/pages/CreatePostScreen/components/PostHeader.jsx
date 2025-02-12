import React from 'react';
import { View } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/createPostStyles';

const PostHeader = ({ navigation }) => {
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
        onPress={() => {/* Handle post creation */}}
        style={styles.postButton}
        labelStyle={styles.postButtonLabel}
      >
        Post
      </Button>
    </View>
  );
};

export default PostHeader;
