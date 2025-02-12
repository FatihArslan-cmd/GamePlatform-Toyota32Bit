import React, { useContext } from 'react';
import { View } from 'react-native';
import { Avatar, Card, Text, TextInput, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../../../../../context/UserContext';
import styles from '../styles/createPostStyles';

const PostInput = () => {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.postArea}>
      <View style={styles.userSection}>
        <Avatar.Image size={60} source={{ uri: user.profilePhoto }} style={styles.avatar} />
        <TouchableRipple
          style={styles.dropdownButton}
          borderless={true}
          rippleColor="rgba(0,0,0,0.1)"
          onPress={() => { /* Handle dropdown press */ }}
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
        />
      </Card.Content>
    </View>
  );
};

export default PostInput;
