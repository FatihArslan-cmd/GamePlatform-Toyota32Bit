import React, { createContext, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../../shared/states/api.js';
import { deleteIfExists } from '../../../utils/api';
import { ToastService } from '../../../context/ToastService';
import useModal from '../../../hooks/useModal';
import { sendVerificationCode } from '../service/sendVerificationCode';
import { Linking } from 'react-native';
import{ fetchAndStoreGames }from '../../../utils/api.js';
import { UserContext } from '../../../context/UserContext';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const navigation = useNavigation();
    const { modalVisible, modalType, modalMessage, modalTitle, showModal, closeModal } = useModal();
    const { loginUser } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(false);

    const handlePostLoginActions = async () => {
        try {
            setIsLoading(true);
            await fetchAndStoreGames();
            const minimumDelay = 2500;
            const elapsedTime = Date.now() - Date.now();
            if (elapsedTime < minimumDelay) {
                await new Promise((resolve) => setTimeout(resolve, minimumDelay - elapsedTime));
            }
            navigation.navigate('Tabs');
        } catch (error) {
            console.error('Error during post-login actions:', error);
            setIsLoading(false);
        }
    };

    const handleLoginPress = async () => {
        try {
            if (rememberMe) {
                showModal('bio', 'Remember Me?', 'Are you sure you want to enable Remember Me?');
            } else {
                await handleDirectLogin();
                deleteIfExists('permissions');
                deleteIfExists('QrCode');
            }
        } catch (error) {
            showModal('error', 'Login Error', error.message || 'An error occurred during login');
        }
    };

    const handleDirectLogin = async () => {
        try {
            const data = await login(username, password);
            setIsLoading(true);
            loginUser(data.data);
            console.log('Login successful:', data.data);
            await handlePostLoginActions();
            setIsLoading(false);
        } catch (error) {
            showModal('error', 'Login Error', error.message || 'An error occurred during login');
            setIsLoading(false);
        }
    };

    const handleConfirmBioModal = async () => {
        closeModal();
        await handleDirectLogin();
    };

    const handleSendCode = async () => {
        if (!username.trim()) {
            ToastService.show("error", 'Username cannot be empty');
            return;
        }
        if (countdown === 0 && !loading) {
            setLoading(true);
            try {
                await sendVerificationCode(username);
                setCountdown(30);
                ToastService.show("info", 'Code sent successfully');
                setTimeout(() => {
                    Linking.openURL('https://gmail.app.goo.gl');
                }, 2500);
            } catch (errorResponse) {
                console.error("Error sending verification code:", errorResponse);
                if (errorResponse.status === 404) {
                    ToastService.show("error", 'User not found');
                } else if (errorResponse.status === 400) {
                    ToastService.show("error", 'Invalid username or email issue');
                } else if (errorResponse.status === 429) {
                    const timeLeftMatch = errorResponse.data.message.match(/Please wait (\d+) seconds/);
                    const timeLeft = timeLeftMatch ? parseInt(timeLeftMatch[1], 10) : 30;
                    ToastService.show("error", errorResponse.data.message);
                    setCountdown(timeLeft);
                } else {
                    ToastService.show("error", 'Failed to send password reset code. Please try again.');
                }
                setCountdown(0);
            } finally {
                setLoading(false);
            }
        }
    };

    const value = {
        username,
        setUsername,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        rememberMe,
        setRememberMe,
        isForgotPassword,
        setIsForgotPassword,
        isLoading,
        countdown,
        setCountdown,
        loading,
        setLoading,
        modalVisible,
        modalType,
        modalMessage,
        modalTitle,
        showModal,
        closeModal,
        handleLoginPress,
        handleDirectLogin,
        handleConfirmBioModal,
        handleSendCode,
        handlePostLoginActions,
    };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};