import React, { useRef, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackIcon';
import BottomSheet from '../../components/themeswitch/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import ThemeButton from '../../components/themeswitch/Button';
import LogoutButton from './components/LogOutButton';


const SettingScreen = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [theme, setTheme] = useState(colorScheme);
  const [themeSwitch, setThemeSwitch] = useState('system');


  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === 'dark' ? withTiming('black') : withTiming('white'),
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Animated.View
          style={[
            styles.container,
            { paddingTop: insets.top },
            backgroundColorAnimation,
          ]}
        >
          <BackButton size={32} color="white" />
          <LogoutButton /> {/* Use the imported LogoutButton component */}
          <ThemeButton bottomSheetRef={bottomSheetRef} theme={theme} />

          <BottomSheet
            ref={bottomSheetRef}
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
  themeButton: {
    backgroundColor: '#8a2be2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default SettingScreen;