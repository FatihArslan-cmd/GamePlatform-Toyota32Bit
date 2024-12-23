import React from 'react'
import Navigation from './navigation/Navigation.js'
import { PaperProvider } from 'react-native-paper';
import { theme } from './utils/FontConfig.js';
import { FormProvider } from './pages/LoginScreen/context/FormContext.jsx';
const App = () => {
  return (
    <PaperProvider theme={theme}>
      <FormProvider>
        <Navigation />
      </FormProvider>
    </PaperProvider>
  )
}

export default App