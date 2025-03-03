// FormSection.js
import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import InputField from './FormSectionItem/InputField';
import OptionsSection from './FormSectionItem/OptionsSection';
import ActionButtons from './FormSectionItem/ActionButtons';
import ForgotPasswordSection from './FormSectionItem/ForgotPasswordSection'; // Import ForgotPasswordSection
import CustomModal from '../../../components/CustomModal';
import BioModalContent from './ModalItem/BioModalContent';
import { useNavigation } from '@react-navigation/native';
import { fetchAndStoreGames } from '../../../utils/api';
import { login } from '../../../shared/states/api';
import LoadingFullScreen from '../../../components/LoadingFullScreen';
import { UserContext } from '../../../context/UserContext';
import { deleteIfExists } from '../../../utils/api';
import useModal from '../../../hooks/useModal';
import { ToastService } from '../../../context/ToastService';

const FormSection = () => {
    const { modalVisible, modalType, modalMessage, modalTitle, showModal, closeModal } = useModal();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false); // State to control ForgotPasswordSection visibility
    const navigation = useNavigation();
    const slideAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const [isLoading, setIsLoading] = useState(false);
    const { loginUser } = useContext(UserContext);

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
            await handlePostLoginActions();
        } catch (error) {
            showModal('error', 'Login Error', error.message || 'An error occurred during login');
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
        ToastService.show('success', 'Login successful');
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


    const handleConfirmBioModal = async () => {
        closeModal();
        await handleDirectLogin();
    };

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
                        username={username} // Pass username to ForgotPasswordSection
                        onBackToLogin={() => handleForgotPasswordToggle(false)}
                    />
                )}
            </Animated.View>

            <CustomModal
                visible={modalVisible && modalType === 'bio'}
                 onDismiss={closeModal}
                confirmText="Allow"
                 showConfirmButton="true"
                onConfirm={handleConfirmBioModal}
            >
                <BioModalContent />
            </CustomModal>

             <CustomModal
                    visible={modalVisible && modalType === 'error'}
                   onDismiss={closeModal}
                    title={modalTitle}
                    text={modalMessage}
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