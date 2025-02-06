import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { becomeSupporter } from '../../services/api';
import ToastMessage from '../../../../components/ToastMessage/Toast';
import useToast from '../../../../components/ToastMessage/hooks/useToast';
import RoomCardContent from './RoomCardContent'; // Import RoomCardContent
import BlurOverlay from './BlurOverlay'; // Import BlurOverlay

const RoomCard = ({ room }) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const blurRadius = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const { showToast, currentToast, hideToast } = useToast();

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
      showToast('success', "You are now a supporter!");
    } catch (error) {
      setIsBlurred(false);
      handlePress();
      if (error.message === "Zaten supportersiniz") {
        showToast('warning', "You are already a supporter of this room.");
      }
      else {
        showToast('error', "Failed to become a supporter. Please try again.");
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

      <BlurOverlay // Use BlurOverlay here
        isBlurred={isBlurred}
        blurRadiusValue={blurRadius}
        buttonOpacityValue={buttonOpacity}
        handleBecomeMemberPress={handleBecomeMemberPress}
      />

      {currentToast && (
        <ToastMessage
          type={currentToast.type}
          message={currentToast.message}
          onHide={hideToast}
        />
      )}
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