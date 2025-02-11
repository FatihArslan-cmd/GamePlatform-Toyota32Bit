import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TopBar from './components/TopBar';
import ProfileSection from './components/ProfileSection';
import styles from './styles/ProfileScreenStyles';
import Buttons from './components/Buttons';

const ProfileScreen = () => {
    const [isEditMode, setIsEditMode] = useState(false); // State for edit mode

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <TopBar onPencilPress={toggleEditMode} isEditMode={isEditMode} /> 
                <ProfileSection isEditMode={isEditMode} /> 
                <Buttons/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default ProfileScreen;