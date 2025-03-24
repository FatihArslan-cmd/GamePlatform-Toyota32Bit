import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, Avatar} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import formatDate from '../../../../../utils/FormatDate';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../../../../context/ThemeContext'; // Import useTheme

const MessageItem = ({ message }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(message.initialLikes || 0);
  const { colors } = useTheme(); // Use theme context
  const styles = createStyles(colors); // Create styles with theme colors

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: colors.postBG }]}>
      <View style={styles.messageContent}>
        <View style={styles.headerContainer}>
          <Avatar.Image
            size={50}
            source={{ uri: message.userAvatar || 'https://via.placeholder.com/50' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <View style={styles.usernameTimeContainer}>
              <Text variant="titleMedium" style={[styles.username, { color: colors.text }]}>{message.username}</Text>
              <Text variant="bodySmall" style={[styles.timestamp, { color: colors.subText }]}>{formatDate(message.timePosted)}</Text>
            </View>
          </View>
        </View>

        <Text variant="bodyMedium" style={[styles.contentText, { color: colors.text }]}>{message.content}</Text>

        {message.contentImage && (
          <View style={styles.imageContainer}>
            <FastImage
              source={{ uri: message.contentImage }}
              style={styles.contentImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        )}

        <View style={styles.actionsContainer}>
          <View style={styles.actionItemLeft}>
            <View style={styles.interactionButton}>
              <IconButton
                icon={liked ? "heart" : "heart-outline"}
                iconColor={liked ? colors.error : 'grey'}
                size={20}
                onPress={handleLike}
              />
              <Text variant="bodySmall" style={[styles.interactionText, { color: 'grey' }, liked && { color: colors.error }]}>
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
                onPress={() => {}}
              />
              <Text variant="bodySmall" style={[styles.interactionText, { color: 'grey' }]}>
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
                onPress={() => {}}
              />
              <Text variant="bodySmall" style={[styles.interactionText, { color: 'grey' }]}>
                {message.shareCount || 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
    </Animated.View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  line: {
    height: 1,
    
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
    // color: '#333', // Removed hardcoded color, using theme now
    marginRight: 8,
  },
  timestamp: {
    // color: '#888', // Removed hardcoded color, using theme now
    fontFamily:'Orbitron-ExtraBold'
  },
  contentText: {
    // color: '#333', // Removed hardcoded color, using theme now
    lineHeight: 20,
    marginVertical: 12,
    fontSize: 20,
    fontWeight:'600',
    fontFamily:'Orbitron-ExtragBold',
    paddingLeft: 62,
  },
  imageContainer: {
    alignItems: 'center',
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
    // color: 'grey', // Removed hardcoded color, using theme now
    marginLeft: 4,
  },
  likedText: {
    // color: 'red', // Removed hardcoded color, using theme now
  },
});

export default MessageItem;