import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import formatDate from '../../../../utils/FormatDate';
import { BlurView } from '@react-native-community/blur';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeIn, Easing } from 'react-native-reanimated'; // Import Easing for more control
import { becomeSupporter } from '../../services/api';
import ToastMessage from '../../../../components/ToastMessage/Toast';
import useToast from '../../../../components/ToastMessage/hooks/useToast';

const RoomCard = ({ room }) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const blurRadius = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const { showToast, currentToast, hideToast } = useToast(); // Use the useToast hook


  const animatedBlurStyle = useAnimatedStyle(() => {
    return {
      blurRadius: blurRadius.value,
      opacity: blurRadius.value > 0 ? 1 : 0,
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  const handlePress = () => {
    setIsBlurred(!isBlurred);
    if (!isBlurred) {
      blurRadius.value = withTiming(4, { duration: 300, easing: Easing.ease }); // Increased duration and added easing
      buttonOpacity.value = withTiming(1, { duration: 400, easing: Easing.ease }); // Increased duration and added easing
    } else {
      blurRadius.value = withTiming(0, { duration: 300, easing: Easing.ease }); // Increased duration and added easing
      buttonOpacity.value = withTiming(0, { duration: 300, easing: Easing.ease }); // Increased duration and added easing
    }
  };

  const handleBecomeMemberPress = async () => {
    console.log("API çağrısı öncesi room.id:", room.id); // room.id değerini kontrol et

    try {
      console.log("API çağrısı öncesi room.id:", room.id); // room.id değerini kontrol et
      await becomeSupporter(room.id);
      console.log("API çağrısı başarılı"); // API başarılı mı kontrol et
      setIsBlurred(false);
      handlePress();
      showToast('success', "You are now a supporter!"); // Show success toast
      console.log("You are now a supporter!");
    } catch (error) {
      setIsBlurred(false);
      handlePress();
      if (error.message === "Zaten supportersiniz") {
        showToast('warning', "You are already a supporter of this room."); // Show warning toast for "Zaten supportersiniz"
        console.log("You are already a supporter!");
      }
      else {
        showToast('error', "Failed to become a supporter. Please try again."); // Show generic error toast
      }

    } finally {
      // setIsBecomingSupporter(false); // Removed setIsBecomingSupporter as it's not defined and likely not needed for toast
      console.log("Yükleme durumu bitti"); // Finally bloğuna girildi mi kontrol et
    }
  };
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Card style={styles.card}>
        <View style={styles.container}>
          <FastImage
            source={{ uri: room.imageUrl, priority: FastImage.priority.high }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>{room.name}</Text>
              <Text style={styles.date}>{formatDate(room.createdAt)}</Text>
            </View>

            <Text style={styles.topic}>{room.topic}</Text>

            <View style={styles.footer}>
              <View style={styles.supporterContainer}>
                <Text style={styles.supporters}>
                  {room.supporterCount} supporters
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>

      <Animated.View style={[styles.blurContainer, animatedBlurStyle, StyleSheet.absoluteFillObject]} pointerEvents="none">
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="white"
        />
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, animatedButtonStyle, StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center', pointerEvents: isBlurred ? 'auto' : 'none' }]}>
        <TouchableOpacity
          style={styles.becomeMemberButton}
          onPress={() => {handleBecomeMemberPress() }}
          entering={FadeIn.duration(300)}
        >
          <Text style={styles.becomeMemberButtonText}>Become a member</Text>
        </TouchableOpacity>
      </Animated.View>
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
  container: {
    flexDirection: 'row',
    height: 140,
  },
  image: {
    width: 140,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Orbitron-ExtraBold',
    flex: 1,
  },
  topic: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    height: 35,
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 12,
    color: '#888888',
  },
  supporterContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  supporters: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 12,
    color: '#444444',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    overflow: 'hidden',
  },
  becomeMemberButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 5,
  },
  becomeMemberButtonText: {
    color: '#ffffff',
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 16,
  },
});

export default RoomCard;