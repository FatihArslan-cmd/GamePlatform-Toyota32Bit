import React from 'react';
import { View } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../../context/ThemeContext';
import styles from '../styles/createPostStyles';
import GrandientText from '../../../../../components/GrandientText';
import {useTranslation} from 'react-i18next'; 

const PostHeader = ({ navigation, onPost, isPosting }) => {
  const { colors } = useTheme();
  const { t } = useTranslation(); 

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
      text={t('communityScreen.shareYourThoughts')}
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
        {t('communityScreen.postButton')} 
      </Button>
    </View>
  );
};

export default PostHeader;