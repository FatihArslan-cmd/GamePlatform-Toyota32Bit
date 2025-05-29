import Buttons from "./components/Buttons";
import ProfileSection from "./components/ProfileSection";
import React from "react";
import TopBar from "./components/TopBar";
import styles from "./styles/ProfileScreenStyles";
import { StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import { AchievementsContextProvider } from "./components/Achivements/context/AchievementsContext";
import { ButtonsContextProvider } from "./components/context/ButtonsContext";
import { ProfileContextProvider } from "./context/ProfileContext";

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