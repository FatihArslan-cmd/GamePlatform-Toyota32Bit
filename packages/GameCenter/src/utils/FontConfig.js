import { BlendMode } from '@shopify/react-native-skia';
import { configureFonts, MD2LightTheme } from 'react-native-paper';

const fontConfig = {
  android: {
    regular: {
      fontFamily: 'Anton-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Orbitron-VariableFont_wght',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Orbitron-ExtraBold',
      fontWeight: 'bold',
    },
    light: {
      fontFamily: 'RussoOne-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto_Condensed-Black',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Anton-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Orbitron-VariableFont_wght',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'RussoOne-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'SQR721B',
      fontWeight: 'normal',
    },
  },
  web: {
    regular: {
      fontFamily: 'Anton-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Orbitron-VariableFont_wght',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'RussoOne-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'SQR721B',
      fontWeight: 'normal',
    },
  },
};

export const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({ config: fontConfig, isV3: false ,}),
};