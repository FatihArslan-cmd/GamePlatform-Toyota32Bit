import React, { useEffect, useRef, useCallback, memo } from 'react';
import { StyleSheet, Animated, Dimensions, View, TouchableWithoutFeedback } from 'react-native';
import { Modal, Portal, Button, Text } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const CustomModal = memo(({
  visible,
  onDismiss,
  onConfirm,
  children,
  title,
  text,
  confirmText = 'Confirm',
  showConfirmButton = false,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const blurFadeAnim = useRef(new Animated.Value(0)).current;
  const { height } = Dimensions.get('window');
  const { colors } = useTheme();
  const { t } = useTranslation(); 

  const handleDismiss = useCallback(() => {
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
      Animated.timing(blurFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  }, [height, slideAnim, fadeAnim, blurFadeAnim, onDismiss]); 

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(height);
      fadeAnim.setValue(0);
      blurFadeAnim.setValue(0);

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
        Animated.timing(blurFadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, height, slideAnim, fadeAnim, blurFadeAnim]);

  if (!visible) return null;

  return (
    <Portal>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: blurFadeAnim }]}>
        <BlurView blurType="dark" blurAmount={2} style={StyleSheet.absoluteFill}>
          <TouchableWithoutFeedback onPress={handleDismiss}>
            <View style={StyleSheet.absoluteFill} >
              <Modal
                visible={visible}
                onDismiss={() => {}}
                dismissable={false}
                contentContainerStyle={[
                  styles.modalContainer,
                  {  backgroundColor: colors.background,},
                  { transform: [{ translateY: slideAnim }] },
                ]}>
                <Animated.View
                  style={[
                    styles.content,
                    {
                      opacity: fadeAnim,
                      transform: [
                        {
                          scale: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.9, 1],
                          }),
                        },
                      ],
                    },
                  ]}>
                  {title && <Text style={[styles.title,{color:colors.text}]}>{title}</Text>}
                  {text && <Text style={[styles.text,{color:colors.text}]}>{text}</Text>}
                  {children}
                  <View style={styles.buttonContainer}>
                    <Button
                      mode="outlined"
                      onPress={handleDismiss}
                      style={styles.closeButton}
                      labelStyle={styles.closeButtonLabel}>
                      {t('customModal.cancel')} 
                    </Button>

                    {showConfirmButton && (
                      <Button
                        mode="contained"
                        onPress={onConfirm}
                        style={styles.confirmButton}
                        labelStyle={styles.confirmButtonLabel}>
                        {confirmText === 'Confirm' ? t('customModal.confirm') : confirmText} 
                      </Button>
                    )}
                  </View>
                </Animated.View>
              </Modal>
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </Animated.View>
    </Portal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    width: '80%',
    alignSelf: 'center',
  },
  content: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'Orbitron-ExtraBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#d3d3d3',
    fontFamily: 'Orbitron-VariableFont_wght',
    marginBottom: 20,
    textAlign: 'center',
    marginVertical: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeButton: {
    borderColor: '#8a2be2',
    borderRadius: 30,
    borderWidth: 2,
    flex: 1,
    marginRight: 10,
  },
  closeButtonLabel: {
    color: '#8a2be2',
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    letterSpacing: 1,
  },
  confirmButton: {
    backgroundColor: '#228b22',
    borderRadius: 30,
    flex: 1,
    marginLeft: 10,
  },
  confirmButtonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    letterSpacing: 1,
  },
});

export default CustomModal;