import React, { useContext } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Avatar, Card, Text, TextInput, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../../../../../context/UserContext';
import { useTheme } from '../../../../../context/ThemeContext';
import styles from '../styles/createPostStyles';
import {useTranslation} from 'react-i18next'; // Import useTranslation

const PostInput = ({ selectedImage, setSelectedImage, postText, setPostText }) => {
  const { user } = useContext(UserContext);
  const { colors } = useTheme();
  const { t } = useTranslation(); // Use useTranslation hook

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={styles.postArea}>
        <View style={styles.userSection}>
          <Avatar.Image size={60} source={{ uri: user.profilePhoto }} style={styles.avatar}     resizeMode="contain" />
          <TouchableRipple
            style={styles.dropdownButton}
            borderless={true}
            rippleColor="rgba(0,0,0,0.1)"
            onPress={() => { }}
          >
            <>
              <Text style={[styles.dropdownText, { color: 'black' }]}>
                {t('communityScreen.everyone')}
              </Text>
              <Icon name="chevron-down" size={24} color={colors.primary} />
            </>
          </TouchableRipple>
        </View>

        <Card.Content style={styles.inputArea}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder={t('communityScreen.whatsHappening')} 
            placeholderTextColor={colors.subText}
            multiline
            autoFocus={true}
            textAlignVertical="top"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            value={postText}
            onChangeText={setPostText}
            theme={{ colors: { primary: colors.primary } }}
          />
        </Card.Content>

        {selectedImage && (
          <View style={styles.postMediaContainer}>
            <Image source={{ uri: selectedImage }} style={styles.postMediaImage} />
            <TouchableRipple style={styles.removeMediaButton} onPress={handleRemoveImage}>
              <Icon name="close" size={18} style={styles.removeMediaIcon} color={colors.text} />
            </TouchableRipple>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PostInput;