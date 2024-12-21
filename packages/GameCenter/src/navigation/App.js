import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdvancedPagerView from '../pages/IntroScreen/index.jsx';
import LoginScreen from '../pages/LoginScreen/index.jsx';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../utils/FontConfig.js';// Tema dosyasını içe aktarın

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Intro"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Intro" component={AdvancedPagerView} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
