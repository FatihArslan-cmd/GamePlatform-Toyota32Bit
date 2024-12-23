import { useState, useRef, useEffect } from 'react';

const useFormState = (onSendCode) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handleLoginPress = () => {
    if (rememberMe) {
      setModalVisible(true);
    } else {
      console.log('Login without Remember Me');
    }
  };

  const handleForgotPasswordToggle = (showForgot) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: showForgot ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setIsForgotPassword(showForgot);
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }),
    ]).start();
  };

  const handleSendCodeWithCountdown = () => {
    if (countdown === 0) {
      setCountdown(30);
      onSendCode();
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return {
    email, password, showPassword, rememberMe, isForgotPassword, countdown, isModalVisible, slideAnim, opacityAnim,
    setEmail, setPassword, setShowPassword, setRememberMe, setIsForgotPassword, setCountdown, setModalVisible,
    handleForgotPasswordToggle, handleSendCodeWithCountdown, handleLoginPress,
  };
};

export default useFormState;
