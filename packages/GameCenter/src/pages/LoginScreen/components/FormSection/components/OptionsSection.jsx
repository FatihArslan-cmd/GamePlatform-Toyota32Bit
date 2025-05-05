import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Checkbox, Surface, Text, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";
import { useFormContext } from "../../../context/FormContext";

const TABLET_DEVICE = isTablet();

const OptionsSection = () => {
    const { rememberMe, setRememberMe, setIsForgotPassword } = useFormContext();
    const { colors } = useTheme();
    const { t } = useTranslation();
    return (
        <Surface style={styles.container}>
            <TouchableRipple
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.checkboxContainer}>
                <>
                    <Checkbox
                        status={rememberMe ? 'checked' : 'unchecked'}
                        onPress={() => setRememberMe(!rememberMe)}
                        color="#8a2be2"
                    />
                    <Text style={[styles.checkboxLabel,{color:colors.text}]}>
                        {t('loginScreen.rememberMe')}
                    </Text>
                </>
            </TouchableRipple>

            <TouchableRipple onPress={() => setIsForgotPassword(true)} style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>
                    {t('loginScreen.forgotPassword')}
                </Text>
            </TouchableRipple>
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: TABLET_DEVICE ? 20 : 8,
        backgroundColor: 'transparent',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        color: '#fff',
        fontSize : TABLET_DEVICE ? 14 : 12,
        fontFamily: 'RussoOne-Regular',
        marginLeft: 8,
    },
    forgotPassword: {
        marginRight: 10,
    },
    forgotPasswordText: {
        color: '#8a2be2',
        fontSize: TABLET_DEVICE ? 14 : 12,
        textDecorationLine: 'underline',
        fontFamily: 'Orbitron-VariableFont_wght',
    },
});

export default OptionsSection;