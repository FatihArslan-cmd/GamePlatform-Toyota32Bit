import React from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TopBar from './components/TopBar';
import ProfileSection from './components/ProfileSection';
import styles from './styles/ProfileScreenStyles';


const ProfileScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <TopBar />
                <ProfileSection />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default ProfileScreen;