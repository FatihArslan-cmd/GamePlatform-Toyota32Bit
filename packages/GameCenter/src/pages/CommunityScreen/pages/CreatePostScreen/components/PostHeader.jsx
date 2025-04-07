import GrandientText from "../../../../../components/GrandientText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import styles from "../styles/createPostStyles";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

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
        <Icon name="close" size={TABLET_DEVICE ? 28 : 20} color={colors.text} />
      </TouchableRipple>
     <GrandientText
      text={t('communityScreen.shareYourThoughts')}
      colors={colors.gameCenterText}
      gradientDirection="horizontal"
      width={TABLET_DEVICE ? 400 : 240}
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