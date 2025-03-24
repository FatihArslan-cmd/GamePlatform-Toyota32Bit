import React from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TopBar from './components/TopBar';
import ProfileSection from './components/ProfileSection';
import styles from './styles/ProfileScreenStyles';
import Buttons from './components/Buttons';
import { ProfileContextProvider } from './context/ProfileContext';
import { ButtonsContextProvider } from './components/context/ButtonsContext';
import { AchievementsContextProvider } from './components/Achivements/context/AchievementsContext';
import { useTheme } from '../../context/ThemeContext'; 

const ProfileScreen = () => {
    const { colors } = useTheme(); 

 return (
  <ButtonsContextProvider>
    <AchievementsContextProvider>
        <ProfileContextProvider>
            <SafeAreaProvider>
                <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
                    <StatusBar
                        translucent
                        backgroundColor="transparent"
                        barStyle={colors.theme === 'dark' ? 'light-content' : 'dark-content'}
                    />
                    <TopBar />
                    <ProfileSection />
                    <Buttons/>
                </SafeAreaView>
            </SafeAreaProvider>
        </ProfileContextProvider>
     </AchievementsContextProvider>
   </ButtonsContextProvider>
    );
};

export default ProfileScreen;