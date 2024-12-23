import React, { useEffect } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';

const CustomModal = ({ visible, onDismiss, children }) => {
  const slideAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);
  const { height } = Dimensions.get('window');

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(height);
      fadeAnim.setValue(0);
      
      // Start animations
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  return (
    <Portal>
      {visible && (
        <BlurView
          blurType="dark"
          blurAmount={2}
          style={StyleSheet.absoluteFill}>
          <Modal
            visible={visible}
            onDismiss={handleDismiss}
            contentContainerStyle={[
              styles.modalContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}>
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  }],
                },
              ]}>
              {children}
              <Button
                mode="outlined"
                onPress={handleDismiss}
                style={styles.closeButton}
                labelStyle={styles.closeButtonLabel}>
                Close
              </Button>
            </Animated.View>
          </Modal>
        </BlurView>
      )}
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#121212',
    borderRadius: 15,
    elevation: 4,
    width: '80%',
    alignSelf: 'center',
  },
  content: {
    width: '100%',
  },
  closeButton: {
    borderColor: '#8a2be2',
    borderRadius: 30,
    borderWidth: 2,
  },
  closeButtonLabel: {
    color: '#8a2be2',
    fontSize: 16,
    fontFamily: 'Orbitron-VariableFont_wght',
    letterSpacing: 1,
  },
});

export default CustomModal;