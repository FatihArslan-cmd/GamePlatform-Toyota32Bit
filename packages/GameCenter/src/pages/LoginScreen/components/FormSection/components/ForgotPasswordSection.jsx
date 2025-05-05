import FadeIn from "../../../../../components/Animations/FadeInAnimation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { isTablet } from "../../../../../utils/isTablet";
import { useFormContext } from "../../../context/FormContext";

const TABLET_DEVICE = isTablet();

const ForgotPasswordSection = () => {
    const { 
        setIsForgotPassword, 
        handleSendCode, 
        countdown, 
        setCountdown, 
        loading 
    } = useFormContext();
    const { t } = useTranslation();
    
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown, setCountdown]);

    return (
        <FadeIn>
            <Button
                mode="contained"
                onPress={handleSendCode}
                style={styles.loginButton}
                labelStyle={styles.buttonLabel}
                disabled={countdown > 0 || loading}
                loading={loading}
            >
                {countdown > 0 ? `${countdown} ${t('loginScreen.retryIn')}` : t('loginScreen.sendCode')}
            </Button>

            <Button
                mode="outlined"
                onPress={() => setIsForgotPassword(false)}
                style={styles.signupButton}
                labelStyle={styles.signupButtonLabel}
            >
                {t('loginScreen.backToLogin')}
            </Button>
        </FadeIn>
    );
};

const styles = StyleSheet.create({
    loginButton: {
        marginVertical: 10,
        backgroundColor: '#8a2be2',
        paddingVertical: TABLET_DEVICE ? 8 : 4,
        borderRadius: 30,
    },
    buttonLabel: {
        fontSize: TABLET_DEVICE ? 16 : 12,
        color: '#fff',
        fontFamily: 'Orbitron-ExtraBold',
    },
    signupButton: {
        borderColor: '#8a2be2',
        borderRadius: 30,
        borderWidth: 2,
    },
    signupButtonLabel: {
        color: '#8a2be2',
        fontSize: TABLET_DEVICE ? 16 : 12,
        fontFamily: 'Orbitron-ExtraBold',
        letterSpacing: 1,
    },
});

export default ForgotPasswordSection;