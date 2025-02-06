import React, { useRef, useState,useContext} from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../components/CustomModal';
import BackButton from '../../components/BackIcon';
import BottomSheet from '../../components/themeswitch/BottomSheet'; // Ensure the path is correct
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import ThemeButton from '../../components/themeswitch/Button';
import { UserContext } from '../../context/UserContext';

const SettingScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null); // Ref for the BottomSheet
  const insets = useSafeAreaInsets();
    const [theme, setTheme] = useState(colorScheme);
  const [themeSwitch, setThemeSwitch] = useState('system');
  const { logoutUser } = useContext(UserContext);


  
  const handleLogout = () => {
    logoutUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === 'dark' ? withTiming('black') : withTiming('white'),
    };
  });
 
  return (
        <GestureHandlerRootView style={{flex: 1}}>
              <SafeAreaProvider>
    <Animated.View
      style={[
        styles.container,
        { paddingTop: insets.top },
        backgroundColorAnimation,
      ]}
    >      <BackButton size={32} color="white" />
      <Button
      
        mode="contained"
        onPress={() => setModalVisible(true)}
        style={styles.logoutButton}>
        Logout
      </Button>
      <ThemeButton bottomSheetRef={bottomSheetRef} theme={theme} />


      <CustomModal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        title="Logout"
        text="Are you sure you want to log out?"
        showConfirmButton="false"
        onConfirm={handleLogout}
      />

      <BottomSheet
        ref={bottomSheetRef} // Pass the ref to BottomSheet
        setTheme={setTheme}
        theme={theme}
        setThemeSwitch={setThemeSwitch}
        themeSwitch={themeSwitch}
      />
    
    </Animated.View>
    </SafeAreaProvider>
      </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  logoutButton: {
    backgroundColor: '#8a2be2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  themeButton: {
    backgroundColor: '#8a2be2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default SettingScreen;
