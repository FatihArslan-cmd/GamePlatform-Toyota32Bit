import React from 'react'
import Navigation from './navigation/Navigation.js'
import { PaperProvider } from 'react-native-paper';
import { theme } from './utils/FontConfig.js';

const App = () => {
  return (
    <PaperProvider theme={theme}>
        <Navigation />
    </PaperProvider>
  )
}

export default App