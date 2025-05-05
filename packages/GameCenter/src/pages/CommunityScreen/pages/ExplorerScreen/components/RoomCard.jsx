import BlurOverlay from "./BlurOverlay";
import React, { useState } from "react";
import RoomCardContent from "./RoomCardContent";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { ToastService } from "../../../../../context/ToastService";
import { becomeSupporter } from "../../../services/roomApi";

const RoomCard = ({ room }) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const blurRadius = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const { t } = useTranslation();

  const handlePress = () => {
    setIsBlurred(!isBlurred);
    if (!isBlurred) {
      blurRadius.value = withTiming(4, { duration: 300, easing: Easing.ease });
      buttonOpacity.value = withTiming(1, { duration: 400, easing: Easing.ease });
    } else {
      blurRadius.value = withTiming(0, { duration: 300, easing: Easing.ease });
      buttonOpacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
    }
  };

  const handleBecomeMemberPress = async () => {
    try {
      await becomeSupporter(room.id);
      setIsBlurred(false);
      buttonOpacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
      blurRadius.value = withTiming(0, { duration: 300, easing: Easing.ease });
      ToastService.show('success', t('communityScreen.You have become a supporter of this room.'));
    } catch (error) {
      setIsBlurred(false);
      buttonOpacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
      blurRadius.value = withTiming(0, { duration: 300, easing: Easing.ease });
      ToastService.show('error', error.message || t('communityScreen.Failed to become a supporter of this room.'));
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Card style={styles.card}>
        <RoomCardContent room={room} />
      </Card>

      {isBlurred && (
        <BlurOverlay
          isBlurred={isBlurred}
          blurRadiusValue={blurRadius}
          buttonOpacityValue={buttonOpacity}
          handleBecomeMemberPress={handleBecomeMemberPress}
        />
      )}

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    elevation: 4,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
});

export default RoomCard;