import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react"; // useState import edildi
import { StyleSheet, View, Animated, TouchableOpacity, Dimensions, PanResponder } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text } from "react-native-paper";
const { width } = Dimensions.get('window');

const ToastMessage = forwardRef(({ onHide, action: initialAction }, ref) => { // initialAction olarak yeniden adlandırıldı
  const translateY = useRef(new Animated.Value(-100)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);

  // State'ler eklendi
  const [currentType, setCurrentType] = useState("info");
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentAction, setCurrentAction] = useState(initialAction); // initialAction kullanıldı

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
        opacity.setValue(1 - Math.abs(gestureState.dx) / 200);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > width * 0.4) {
          Animated.timing(translateX, {
            toValue: gestureState.dx > 0 ? width : -width,
            duration: 200,
            useNativeDriver: true,
          }).start(internalHideToast);
        } else {
          Animated.parallel([
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
              tension: 50,
              friction: 8,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    })
  ).current;

  const showAnimation = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
    ]).start(() => {
      timeoutRef.current = setTimeout(internalHideToast, 3000);
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();
    });
  };

  const internalHideToast = () => {
    clearTimeout(timeoutRef.current);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHide) onHide();
      progress.setValue(0);
        setCurrentMessage(""); // Mesajı temizle
    });
  };

  useImperativeHandle(ref, () => ({
    showToast: (toastType = "info", toastMessage = "", toastAction) => {
      setCurrentType(toastType); // State'i güncelle
      setCurrentMessage(toastMessage); // State'i güncelle
      setCurrentAction(toastAction); // State'i güncelle
      showAnimation();
    },
    hideToast: () => {
      internalHideToast();
    },
  }));


  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const getIconAnimation = () => {
    const rotate = translateY.interpolate({
      inputRange: [-100, 0],
      outputRange: ['0deg', '360deg'],
    });

    const iconScale = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });

    return {
      transform: [
        { rotate },
        { scale: iconScale }
      ],
    };
  };


  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.toastContainer,
        {
          opacity,
          transform: [
            { translateY },
            { translateX },
            { scale },
          ],
        },
      ]}
    >
      <View style={[styles.content, { backgroundColor: getBackgroundColor(currentType) }]}> {/* currentType kullanıldı */}
        <Animated.View style={[styles.iconContainer, getIconAnimation()]}>
          <Icon name={getIconName(currentType)} size={24} color="#fff" /> {/* currentType kullanıldı */}
        </Animated.View>

        <View style={styles.messageContainer}>
          <Text style={styles.message} numberOfLines={2}>
            {currentMessage} {/* currentMessage kullanıldı */}
          </Text>
          {currentAction && ( // currentAction kullanıldı
            <TouchableOpacity
              onPress={currentAction.onPress} // currentAction kullanıldı
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.actionText}>{currentAction.label}</Text>  {/* currentAction kullanıldı */}
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={internalHideToast}
          style={styles.closeButton}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          activeOpacity={0.7}
        >
          <Icon name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progressWidth,
            backgroundColor: getBackgroundColor(currentType), // currentType kullanıldı
          }
        ]}
      />
    </Animated.View>
  );
});

const getBackgroundColor = (type) => {
  switch (type) {
    case "success":
      return "#00C853";
    case "error":
      return "#FF1744";
    case "warning":
      return "#FFA000";
    case "info":
    default:
      return "#2979FF";
  }
};

const getIconName = (type) => {
  switch (type) {
    case "success":
      return "check-circle";
    case "error":
      return "error-outline";
    case "warning":
      return "warning";
    case "info":
    default:
      return "info-outline";
  }
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 35,
    left: 20,
    right: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    alignSelf: 'center',
    width: '90%',
    zIndex: 1000,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
    marginRight: 8,
  },
  message: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 0.3,
    fontWeight:'bold'
  },
  closeButton: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 3,
    backgroundColor: '#fff',
  },
  actionButton: {
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ToastMessage;