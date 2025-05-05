import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import FastImage from "react-native-fast-image";
import React, { useEffect, useState } from "react";
import formatDate from "../../../../../utils/FormatDate";
import { StyleSheet, View } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet(); 

const MessageItem = ({ message }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(message.initialLikes || 0);
  const { colors } = useTheme(); 
  const styles = createStyles(colors); 

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
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: colors.background }]}>
      <View style={styles.messageContent}>
        <View style={styles.headerContainer}>
          <Avatar.Image
            size={TABLET_DEVICE ? 50 : 40}
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

const createStyles = () => StyleSheet.create({
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
    marginRight: 8,
  },
  timestamp: {
    fontFamily:'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 14 : 10,

    
  },
  contentText: {
    lineHeight: 20,
    marginVertical: 12,
    fontSize: TABLET_DEVICE ? 20 : 14,
    fontWeight:'600',
    fontFamily:'Orbitron-ExtragBold',
    paddingLeft: 62,
  },
  imageContainer: {
    alignItems: 'center',
  },
  contentImage: {
    width: TABLET_DEVICE ? 200 : 150,
    height: TABLET_DEVICE ? 300 : 200,
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
    marginLeft: 4,
  },
  likedText: {
  },
});

export default MessageItem;