import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { Modal, Portal, Text } from 'react-native-paper';
import { 
  Animated, 
  Dimensions, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  View,
  PanResponder 
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

const BottomSheet = React.memo(({
  visible, 
  onDismiss, 
  title, 
  children, 
  height = '50%',
  backgroundColor = 'white',
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { height: screenHeight } = Dimensions.get('window');
  const panY = useRef(new Animated.Value(0)).current;

  const defaultHeight = useMemo(() => (
    typeof height === 'string' 
      ? screenHeight * (parseInt(height) / 100)
      : height
  ), [height, screenHeight]);

  const resetPositionAnim = useMemo(() => (
    Animated.spring(panY, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    })
  ), [panY]);

  const closeAnim = useMemo(() => (
    Animated.timing(panY, {
      toValue: screenHeight,
      duration: 200,
      useNativeDriver: true,
    })
  ), [panY, screenHeight]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => (
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
      ),
      onPanResponderMove: (_, gestureState) => {
        const newPosition = gestureState.dy;
        if (newPosition < 0) {
          const resistedPosition = -Math.sqrt(Math.abs(newPosition)) * 5;
          panY.setValue(Math.max(resistedPosition, -defaultHeight * 0.3));
        } else {
          panY.setValue(newPosition);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > screenHeight * 0.2 || gestureState.vy > 0.5) {
          closeAnim.start(() => onDismiss());
        } else {
          resetPositionAnim.start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(screenHeight);
      fadeAnim.setValue(0);
      panY.setValue(0);
  
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 1, 
          friction: 10, 
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000, // Daha yavaş bir görünüm animasyonu
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim, screenHeight, panY]);
  

  const backdropOpacity = useMemo(() => panY.interpolate({
    inputRange: [-defaultHeight * 0.3, 0, screenHeight * 0.2],
    outputRange: [1.2, 1, 0],
    extrapolate: 'clamp',
  }), [panY, defaultHeight, screenHeight]);

  const modalStyle = useMemo(() => ({
    transform: [
      { translateY: slideAnim },
      { translateY: panY },
    ],
  }), [slideAnim, panY]);

  const overlayStyle = useMemo(() => ({
    opacity: Animated.multiply(fadeAnim, backdropOpacity),
  }), [fadeAnim, backdropOpacity]);

  const handleDismiss = useCallback(() => onDismiss(), [onDismiss]);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleDismiss} contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <Animated.View style={[StyleSheet.absoluteFill, overlayStyle]}>
            <BlurView
              style={[StyleSheet.absoluteFill, styles.blurView]}
              blurType="light"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <Animated.View 
          {...panResponder.panHandlers}
          style={[
            styles.modalContent,
            modalStyle,
            { height: defaultHeight, backgroundColor },
          ]}
        >
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </Modal>
    </Portal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default BottomSheet;
