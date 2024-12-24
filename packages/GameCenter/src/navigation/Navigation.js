import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { storage } from '../utils/storage.js';
import AdvancedPagerView from '../pages/IntroScreen/components/AdvancedPagerView.jsx';
import LoginScreen from '../pages/LoginScreen/index.jsx';
import HomeScreen from '../pages/HomeScreen/index.jsx';
import CustomHeader from './CustomHeader.jsx';// Yeni bileşen

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isIntroSeen, setIsIntroSeen] = useState(null);

  useEffect(() => {
    const hasSeenIntro = storage.getBoolean('hasSeenIntro');
    setIsIntroSeen(hasSeenIntro ?? false); // Varsayılan false
  }, []);

  if (isIntroSeen === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isIntroSeen ? 'Login' : 'Login'}
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
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerShown: false,
            ...CustomHeader({
              onSearchPress: () => {
                console.log('Search icon pressed');
              },
            }),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
