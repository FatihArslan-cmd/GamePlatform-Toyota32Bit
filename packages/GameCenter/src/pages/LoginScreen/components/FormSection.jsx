import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import InputField from './FormSectionItem/InputField';
import OptionsSection from './FormSectionItem/OptionsSection';
import ActionButtons from './FormSectionItem/ActionButtons';
import ForgotPasswordSection from './FormSectionItem/ForgotPasswordSection';
import CustomModal from '../../../components/CustomModal';
import BioModalContent from './ModalItem/BioModalContent';
import { useNavigation } from '@react-navigation/native';
import { fetchAndStoreGames } from '../../../utils/api';
import { login } from '../../../shared/states/api';
import LoadingFullScreen from '../../../components/LoadingFullScreen';
import { UserContext } from '../../../context/UserContext';
import { deleteIfExists } from '../../../utils/api';

const FormSection = ({ onSendCode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useContext(UserContext);

  const handleLoginPress = async () => {
    try {
      if (rememberMe) {
        setModalVisible(true);
      } else {
        await handleDirectLogin();
        deleteIfExists('permissions');
        deleteIfExists('QrCode');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during login');
      setErrorModalVisible(true);
    }
  };

  const handleDirectLogin = async () => {
    try {
      const data = await login(username, password);
      setIsLoading(true); 
      loginUser(data.data);
      await handlePostLoginActions();
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during login');
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostLoginActions = async () => {
    
    const startTime = Date.now();
    await fetchAndStoreGames();

    const elapsedTime = Date.now() - startTime;
    const minimumDelay = 2500;

    if (elapsedTime < minimumDelay) {
      await new Promise(resolve => setTimeout(resolve, minimumDelay - elapsedTime));
    }

    navigation.navigate('Tabs');
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
    if (!username.trim()) {
      setErrorMessage('Username field cannot be empty');
      setErrorModalVisible(true);
      return;
    }

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

  if (isLoading) {
    return <LoadingFullScreen />;
  }

  return (
    <View style={styles.formContainer}>
      <InputField
        label="Username"
        value={username}
        onChangeText={setUsername}
        leftIcon="account-circle"
        style={styles.input}
      />

      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -30],
                }),
              },
            ],
            opacity: opacityAnim,
          },
        ]}
      >
        {!isForgotPassword ? (
          <>
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon="shield-key"
              rightIcon={showPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowPassword(!showPassword)}
              style={styles.input}
            />
            <OptionsSection
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              setIsForgotPassword={() => handleForgotPasswordToggle(true)}
            />
            <ActionButtons scaleAnim={1} onLoginPress={handleLoginPress} />
          </>
        ) : (
          <ForgotPasswordSection
            onSendCode={handleSendCodeWithCountdown}
            onBackToLogin={() => handleForgotPasswordToggle(false)}
            countdown={countdown}
          />
        )}
      </Animated.View>

      <CustomModal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        confirmText="Allow"
        showConfirmButton="true"
        onConfirm={async () => {
          setModalVisible(false);
          await handleDirectLogin();
         }}
      >
        <BioModalContent />
      </CustomModal>

      <CustomModal
        visible={errorModalVisible}
        onDismiss={() => setErrorModalVisible(false)}
        title="Login Error"
        text={errorMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#ffffff08',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#8a2be230',
    overflow: 'hidden',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff10',
  },
  animatedContainer: {
    width: '100%',
  },
  profileImageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default FormSection;