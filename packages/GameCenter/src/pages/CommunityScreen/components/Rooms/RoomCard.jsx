import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { becomeSupporter } from '../../services/api';
import RoomCardContent from './RoomCardContent'; // Import RoomCardContent
import BlurOverlay from './BlurOverlay'; // Import BlurOverlay
import { ToastService } from '../../../../context/ToastService';

const RoomCard = ({ room }) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const blurRadius = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

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
      handlePress();
      ToastService.show('success', "You have become a supporter of this room.");
    } catch (error) {
      setIsBlurred(false);
      handlePress();
      if (error.message === "Zaten supportersiniz") {
        ToastService.show('info', "You are already a supporter of this room.");
      }
      else {
        ToastService.show('error', error.message || "Failed to become a supporter of this room.");
      }
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
  },
  card: {
    elevation: 4,
    backgroundColor: '#ffffff',
  },
});

export default RoomCard;