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
    light: {
      fontFamily: 'RussoOne-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'SQR721B',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-Black',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-Bold',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-SemiBold',
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
  fonts: configureFonts({ config: fontConfig, isV3: false }),
};
