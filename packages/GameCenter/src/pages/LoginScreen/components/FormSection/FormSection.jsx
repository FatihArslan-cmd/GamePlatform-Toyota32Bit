import ActionButtons from "./components/ActionButtons";
import CustomModal from "../../../../components/CustomModal";
import FadeIn from "../../../../components/Animations/FadeInAnimation";
import ForgotPasswordSection from "./components/ForgotPasswordSection";
import InputField from "./components/InputField";
import LoadingFullScreen from "../../../../components/LoadingFullScreen";
import OptionsSection from "./components/OptionsSection";
import PermissionsModalContent from "../RememberMeModal/ProfileSection/components/PermissionsModalContent";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useFormContext } from "../../context/FormContext";
import { usePermissionsContext } from "../../context/PermissionContext";

const FormSection = () => {
    const { t } = useTranslation(); 

    const {
        username,
        setUsername,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        isForgotPassword,
        isLoading,
        modalVisible,
        modalType,
        modalTitle,
        modalMessage,
        closeModal,
        handleConfirmBioModal,
    } = useFormContext();

    const {
        appIsLoading,
    } = usePermissionsContext();

    if (isLoading || appIsLoading) {
        return <LoadingFullScreen />;
    }

    return (
        <View style={styles.formContainer}>
            <InputField
                label={t('loginScreen.username')} 
                value={username}
                onChangeText={setUsername}
                leftIcon="account-circle"
                style={styles.input}
                isFormSectionInput={true}
            />

            { !isForgotPassword ? (
             <FadeIn>
                <View style={styles.contentContainer}>
                    <InputField
                        label={t('loginScreen.password')}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        leftIcon="shield-key"
                        rightIcon={showPassword ? 'eye-off' : 'eye'}
                        onRightIconPress={() => setShowPassword(!showPassword)}
                        style={styles.input}
                        isFormSectionInput={true}
                    />
                    <OptionsSection />
                    <ActionButtons />
                </View>
                </FadeIn>

            ) : (
                <ForgotPasswordSection />
            )}


            <CustomModal
                visible={modalVisible && modalType === 'bio'}
                onDismiss={closeModal}
                confirmText="Allow"
                showConfirmButton="true"
                onConfirm={handleConfirmBioModal}
            >
                <PermissionsModalContent />
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
    contentContainer: {
        width: '100%',
    },
});

export default FormSection;