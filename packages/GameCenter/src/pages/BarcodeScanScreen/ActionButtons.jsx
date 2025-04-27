import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

const ActionButtons = ({ toggleFlash, flashMode, toggleCamera, zoomIn, zoomOut,goBack }) => {
    return (
        <>
            <TouchableRipple style={styles.backButton} onPress={goBack}>
                <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableRipple>

            <TouchableRipple style={styles.flashButton} onPress={toggleFlash}>
                <Ionicons name={flashMode ? 'flash' : 'flash-off'} size={30} color="#fff" />
            </TouchableRipple>

            <TouchableRipple style={styles.toggleButton} onPress={toggleCamera}>
                <Ionicons name="camera-reverse" size={30} color="#fff" />
            </TouchableRipple>

            <TouchableRipple style={styles.zoomInButton} onPress={zoomIn}>
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableRipple>

            <TouchableRipple style={styles.zoomOutButton} onPress={zoomOut}>
                <Ionicons name="remove" size={30} color="#fff" />
            </TouchableRipple>
        </>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 35,
        left: 20,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 50,
    },
    flashButton: {
        position: 'absolute',
        top: 35,
        right: 20,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 50,
    },
    toggleButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        borderRadius: 50,
    },
    zoomInButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        borderRadius: 50,
    },
    zoomOutButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        borderRadius: 50,
    },
});

export default ActionButtons;