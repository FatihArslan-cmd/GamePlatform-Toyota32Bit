import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { becomeSupporter } from '../../../services/roomApi';
import RoomCardContent from './RoomCardContent'; // Import RoomCardContent
import BlurOverlay from './BlurOverlay'; // Import BlurOverlay
import { ToastService } from '../../../../../context/ToastService';
import {useTranslation} from 'react-i18next';

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
      ToastService.show('success', t('communityScreen.You have become a supporter of this room.'));
    } catch (error) {
      setIsBlurred(false);
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

      <BlurOverlay
        isBlurred={isBlurred}
        blurRadiusValue={blurRadius}
        buttonOpacityValue={buttonOpacity}
        handleBecomeMemberPress={handleBecomeMemberPress}
      />

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
    borderRadius: 8,
  },
  card: {
    elevation: 4,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
});

export default RoomCard;