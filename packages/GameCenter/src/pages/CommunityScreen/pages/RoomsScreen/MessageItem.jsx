import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, Avatar} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import formatDate from '../../../../utils/FormatDate';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const MessageItem = ({ message }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(message.initialLikes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  // Reanimated Fade In Animation
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 }); // Fade in over 300ms
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });


  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.line} />
      <View style={styles.messageContent}>
        <View style={styles.headerContainer}>
          <Avatar.Image
            size={50}
            source={{ uri: message.userAvatar || 'https://via.placeholder.com/50' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <View style={styles.usernameTimeContainer}>
              <Text variant="titleMedium" style={styles.username}>{message.username}</Text>
              <Text variant="bodySmall" style={styles.timestamp}>{formatDate(message.timePosted)}</Text>
            </View>
          </View>
        </View>

        <Text variant="bodyMedium" style={styles.contentText}>{message.content}</Text>

        {message.contentImage && (
          <FastImage
            source={{ uri: message.contentImage }}
            style={styles.contentImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}

        <View style={styles.actionsContainer}>
          <View style={styles.actionItemLeft}>
            <View style={styles.interactionButton}>
              <IconButton
                icon={liked ? "heart" : "heart-outline"}
                iconColor={liked ? 'red' : 'grey'}
                size={20}
                onPress={handleLike}
              />
              <Text variant="bodySmall" style={[styles.interactionText, liked && styles.likedText]}>
                {likeCount}
              </Text>
            </View>
          </View>

          <View style={styles.actionItemCenter}>
            <View style={styles.interactionButton}>
              <IconButton
                icon="chat-outline"
                iconColor="grey"
                size={20}
                onPress={() => {}} // Add comment functionality here
              />
              <Text variant="bodySmall" style={styles.interactionText}>
                {message.commentCount || 0}
              </Text>
            </View>
          </View>

          <View style={styles.actionItemRight}>
            <View style={styles.interactionButton}>
              <IconButton
                icon="share-variant-outline"
                iconColor="grey"
                size={20}
                onPress={() => {}} // Add share functionality here
              />
              <Text variant="bodySmall" style={styles.interactionText}>
                {message.shareCount || 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
   backgroundColor: 'white',
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  messageContent: {
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  usernameTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontFamily:'Orbitron-ExtraBold',
    color: '#333',
    marginRight: 8,
  },
  timestamp: {
    color: '#888',
    fontFamily:'Orbitron-ExtraBold'
  },
  contentText: {
    color: '#333',
    lineHeight: 20,
    marginVertical: 12,
    fontSize: 20,
    fontWeight:'600',
    fontFamily:'Orbitron-ExtragBold',
    paddingLeft: 62,
  },
  contentImage: {
    width: 200,
    height: 300,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 50,
  },
  actionItemLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  actionItemCenter: {
    flex: 1,
    alignItems: 'center',
  },
  actionItemRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  interactionText: {
    color: 'grey',
    marginLeft: 4,
  },
  likedText: {
    color: 'red',
  },
});

export default MessageItem;