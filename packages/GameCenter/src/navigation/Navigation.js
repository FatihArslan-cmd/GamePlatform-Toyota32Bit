import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { storage } from '../utils/storage.js';
import AdvancedPagerView from '../pages/IntroScreen/components/AdvancedPagerView.jsx';
import LoginScreen from '../pages/LoginScreen/index.jsx';
import HomeScreen from '../pages/HomeScreen/index.jsx';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isIntroSeen, setIsIntroSeen] = useState(null);

  useEffect(() => {
    const hasSeenIntro = storage.getBoolean('hasSeenIntro');
    setIsIntroSeen(hasSeenIntro ?? false); // Default to false if not set
  }, []);

  if (isIntroSeen === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isIntroSeen ? 'Login' : 'Intro'}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Intro"
          component={AdvancedPagerView}
          options={{
            // Save when the intro screen is finished
            headerShown: false,
          }}
          listeners={{
            focus: () => {
              storage.set('hasSeenIntro', true); // Mark intro as seen
            },
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{
        }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
