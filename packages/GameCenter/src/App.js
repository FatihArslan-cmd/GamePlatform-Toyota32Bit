import React from 'react'
import Navigation from './navigation/Navigation.js'
import { PaperProvider } from 'react-native-paper';
import { theme } from './utils/FontConfig.js';
import { UserProvider } from './context/UserContext.jsx';
import { ToastProvider } from './context/ToastService.jsx';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <ToastProvider>
      <UserProvider>
        <Navigation />
      </UserProvider>
      </ToastProvider>
    </PaperProvider>
  )
}

export default App