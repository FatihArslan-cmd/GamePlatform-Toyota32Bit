import React, { useState, useEffect } from 'react';
import { StyleSheet,Linking } from 'react-native';
import { Button } from 'react-native-paper';
import { ToastService } from '../../../../context/ToastService';
import { sendVerificationCode } from '../../service/service'; // Import the service function

const ForgotPasswordSection = ({ onBackToLogin, username }) => {
    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSendCode = async () => { // Make handleSendCode async
        if (!username.trim()) {
          ToastService.show("error", 'Username cannot be empty');
           return;
        }
        if (countdown === 0 && !loading) { // Prevent multiple requests while loading and during countdown
            setLoading(true); // Set loading to true when button is pressed
            try {
                await sendVerificationCode(username); // Call the API function
                setCountdown(30);
                ToastService.show("info", 'Code sent successfully');
                setTimeout(() => {
                  Linking.openURL('https://gmail.app.goo.gl');
                }, 2500);
            } catch (errorResponse) { // Catch errors from API call
                console.error("Error sending verification code:", errorResponse);
                if (errorResponse.status === 404) {
                    ToastService.show("error", 'User not found');
                } else if (errorResponse.status === 400) {
                    ToastService.show("error", 'Invalid username or email issue'); // Or handle specific 400 errors if your backend provides more detail
                } else if (errorResponse.status === 429) {
                    const timeLeftMatch = errorResponse.data.message.match(/Please wait (\d+) seconds/);
                    const timeLeft = timeLeftMatch ? parseInt(timeLeftMatch[1], 10) : 30; // Default to 30s if parsing fails
                    ToastService.show("error", errorResponse.data.message); // Show rate limit message
                    setCountdown(timeLeft); // Optionally set countdown from backend message, though frontend countdown is already running
                }
                 else {
                    ToastService.show("error", 'Failed to send password reset code. Please try again.');
                }
                setCountdown(0); // Reset countdown on error, or handle based on error type
            } finally {
                setLoading(false); // Set loading to false after API call completes (success or error)
            }
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

    return (
        <>
            <Button
                mode="contained"
                onPress={handleSendCode}
                style={styles.loginButton}
                labelStyle={styles.buttonLabel}
                disabled={countdown > 0 || loading} // Disable button when countdown is active or while loading
                loading={loading} // Set loading prop based on loading state
            >
                {countdown > 0 ? `Retry in ${countdown}s` : 'Send Code'}
            </Button>

            <Button
                mode="outlined"
                onPress={onBackToLogin}
                style={styles.signupButton}
                labelStyle={styles.signupButtonLabel}
            >
                Back to Login
            </Button>
        </>
    );
};

const styles = StyleSheet.create({
    loginButton: {
        marginVertical: 10,
        backgroundColor: '#8a2be2',
        paddingVertical: 8,
        borderRadius: 30,
        left: 25,
    },
    buttonLabel: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Orbitron-VariableFont_wght',
    },
    signupButton: {
        borderColor: '#8a2be2',
        borderRadius: 30,
        borderWidth: 2,
        left: 25,
    },
    signupButtonLabel: {
        color: '#8a2be2',
        fontSize: 16,
        fontFamily: 'Orbitron-VariableFont_wght',
        letterSpacing: 1,
    },
});

export default ForgotPasswordSection;