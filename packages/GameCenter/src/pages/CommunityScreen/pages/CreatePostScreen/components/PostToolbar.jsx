import React from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/createPostStyles';

const PostToolbar = () => {
  return (
    <View style={styles.toolbarContainer}>
      <View style={styles.toolbar}>
        <TouchableRipple
          style={styles.toolbarButton}
          borderless={true}
          rippleColor="rgba(0,0,0,0.1)"
          onPress={() => { /* Handle image selection */ }}
        >
          <Icon name="image" size={28} color="#1DA1F2" />
        </TouchableRipple>
        <TouchableRipple
          style={styles.toolbarButton}
          borderless={true}
          rippleColor="rgba(0,0,0,0.1)"
          onPress={() => { /* Handle GIF selection */ }}
        >
          <Icon name="file-gif-box" size={28} color="#1DA1F2" />
        </TouchableRipple>
        <TouchableRipple
          style={styles.toolbarButton}
          borderless={true}
          rippleColor="rgba(0,0,0,0.1)"
          onPress={() => { /* Handle list options */ }}
        >
          <Icon name="format-list-bulleted" size={28} color="#1DA1F2" />
        </TouchableRipple>
        <TouchableRipple
          style={styles.toolbarButton}
          borderless={true}
          rippleColor="rgba(0,0,0,0.1)"
          onPress={() => { /* Handle location selection */ }}
        >
          <Icon name="map-marker" size={28} color="#1DA1F2" />
        </TouchableRipple>
      </View>
    </View>
  );
};

export default PostToolbar;
