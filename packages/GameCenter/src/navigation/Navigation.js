import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { storage } from '../utils/storage';
import AdvancedPagerView from '../pages/IntroScreen/components/AdvancedPagerView.jsx';
import LoginScreen from '../pages/LoginScreen/index.jsx';
import TabNavigator from './TabBarNavigator.jsx';
import GameDetails from '../pages/HomeScreen/components/GameDetails/GameDetails.jsx';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isIntroSeen, setIsIntroSeen] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  

  useEffect(() => {
    const hasSeenIntro = storage.getBoolean('hasSeenIntro');
    setIsIntroSeen(hasSeenIntro ?? false); 

    const token = storage.getString('token');  
    setIsLoggedIn(!!token);  
  }, []);

  if (isIntroSeen === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isIntroSeen ? (isLoggedIn ? 'Login' : 'Login') : 'Intro'}  // Giriş yapmamışsa Login ekranına git
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
              storage.set('hasSeenIntro', true); // Intro işaretlendi
            },
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen
          name="GameDetails"
          component={GameDetails}
          options={{
            presentation: 'transparentModal', // Arka plan için transparan görünüm
            animation: 'fade', // Sadece fade animasyonu
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
