import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { storage } from '../utils/storage';
import AdvancedPagerView from '../pages/IntroScreen/components/AdvancedPagerView.jsx';
import LoginScreen from '../pages/LoginScreen/index.jsx';
import TabNavigator from './TabBarNavigator.jsx';
import GameDetails from '../pages/HomeScreen/components/GameDetails/GameDetails.jsx';
import SettingScreen from '../pages/SettingsScreen/index.jsx';
import BootSplash from 'react-native-bootsplash';
import { Animated } from 'react-native';
import GameScreen from '../pages/GameScreen/index.jsx';
import ChatScreen from '../pages/LiveScreen/ChatScreen.jsx';
import BarcodeScan from '../components/BarcodeScanScreen/BarcodeScan.jsx';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isIntroSeen, setIsIntroSeen] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scaleAnim = useState(new Animated.Value(10.0))[0];

  useEffect(() => {
    async function initializeApp() {
      const hasSeenIntro = storage.getBoolean('hasSeenIntro');
      setIsIntroSeen(hasSeenIntro ?? false);

      const token = storage.getString('token');
      setIsLoggedIn(!!token);

      setTimeout(() => {
        BootSplash.hide({ fade: true }).then(() => {
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }).start();
        });
      }, 175);
    }

    initializeApp();
  }, []);

  if (isIntroSeen === null) {
    return null; // Return a loading state or placeholder if necessary
  }

  return (
    <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isIntroSeen ? (isLoggedIn ? 'Tabs' : 'Login') : 'Intro'}
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="Intro"
            component={AdvancedPagerView}
            options={{
              headerShown: false,
            }}
            listeners={{
              focus: () => {
                storage.set('hasSeenIntro', true);
              },
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{
              animation: 'fade',
            }}
          />
           <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              animation: 'fade',
            }}
          />
             <Stack.Screen
            name="BarcodeScan"
            component={BarcodeScan}
            options={{
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              animation: 'slide_from_left',
            }}
          />
          <Stack.Screen
            name="GameDetails"
            component={GameDetails}
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
            }}
          />
     
        <Stack.Screen name="GameScreen"
         component={GameScreen}   options={{
              animation: 'fade',
            }}
         />
        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
}
