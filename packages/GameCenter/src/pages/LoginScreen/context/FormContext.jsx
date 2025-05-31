import React, { createContext, useContext, useState } from "react";
import useModal from "../../../hooks/useModal";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import { ToastService } from "../../../context/ToastService";
import { UserContext } from "../../../context/UserContext";
import { login } from "../../../shared/states/api.js";
import { deleteIfExists } from "../../../utils/api";
import { sendVerificationCode } from "../service/sendVerificationCode";

import{ fetchAndStoreGames }from '../../../utils/api.js';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const navigation = useNavigation();
    const { modalVisible, modalType, modalMessage, modalTitle, showModal, closeModal } = useModal();
    const { loginUser } = useContext(UserContext);
    const { t } = useTranslation(); 

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
            setIsLoading(false);
        }
    };

    const handleLoginPress = async () => {
        try {
            if (rememberMe) {
                showModal('bio', t('formContextMessages.rememberMeTitle'), t('formContextMessages.rememberMeMessage'));
            } else {
                await handleDirectLogin();
                deleteIfExists('permissions');
                deleteIfExists('QrCode');
            }
        } catch (error) {
            showModal('error', t('formContextMessages.loginErrorTitle'), error.message || t('formContextMessages.loginErrorMessage')); 
        }
    };

    const handleDirectLogin = async () => {
        try {
            const data = await login(username, password);
            setIsLoading(true);
            loginUser(data.data);
            await handlePostLoginActions();
            setIsLoading(false);
        } catch (error) {
            showModal('error', t('formContextMessages.loginErrorTitle'), error.message || t('formContextMessages.loginErrorMessage')); 
            setIsLoading(false);
        }
    };

    const handleConfirmBioModal = async () => {
        closeModal();
        await handleDirectLogin();
    };

    const handleSendCode = async () => {
        if (!username.trim()) {
            ToastService.show("error", t('formContextMessages.usernameEmpty'));
            return;
        }
        if (countdown === 0 && !loading) {
            setLoading(true);
            try {
                await sendVerificationCode(username);
                setCountdown(30);
                ToastService.show("info", t('formContextMessages.codeSentSuccess')); 
                setTimeout(() => {
                    Linking.openURL('https://gmail.app.goo.gl');
                }, 2500);
            } catch (errorResponse) {
                if (errorResponse.status === 404) {
                    ToastService.show("error", t('formContextMessages.userNotFound')); 
                } else if (errorResponse.status === 400) {
                    ToastService.show("error", t('formContextMessages.invalidUsernameEmail'));
                } else if (errorResponse.status === 429) {
                    const timeLeftMatch = errorResponse.data.message.match(/Please wait (\d+) seconds/);
                    const timeLeft = timeLeftMatch ? parseInt(timeLeftMatch[1], 10) : 30;
                    ToastService.show("error", t('formContextMessages.rateLimitError', { seconds: timeLeft })); 
                    setCountdown(timeLeft);
                } else {
                    ToastService.show("error", t('formContextMessages.sendCodeFailed'));
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