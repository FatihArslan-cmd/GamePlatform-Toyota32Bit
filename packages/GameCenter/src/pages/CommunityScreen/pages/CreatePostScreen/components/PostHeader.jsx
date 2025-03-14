import React from 'react';
import { View } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../../context/ThemeContext';
import styles from '../styles/createPostStyles';
import GrandientText from '../../../../../components/GrandientText';

const PostHeader = ({ navigation, onPost, isPosting }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <TouchableRipple
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
        borderless={true}
        rippleColor="rgba(0,0,0,0.1)"
      >
        <Icon name="close" size={28} color={colors.text} />
      </TouchableRipple>
     <GrandientText
      text="Share your thoughts"
      colors={colors.gameCenterText} 
      gradientDirection="horizontal"
      width={400}
    />
      <Button
        mode="contained"
        onPress={onPost}
        style={styles.postButton}
        labelStyle={styles.postButtonLabel}
        loading={isPosting}
        disabled={isPosting}
      >
        Post
      </Button>
    </View>
  );
};

export default PostHeader;