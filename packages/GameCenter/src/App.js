import React from 'react'
import Navigation from './navigation/Navigation.js'
import { PaperProvider } from 'react-native-paper';
import { theme } from './utils/FontConfig.js';
import { UserProvider } from './context/UserContext.jsx';
const App = () => {
  return (
    <PaperProvider theme={theme}>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </PaperProvider>
  )
}

export default App