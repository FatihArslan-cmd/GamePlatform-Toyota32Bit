const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const config = {
  watchFolders: [
    // Lerna root düzeyindeki node_modules
    path.resolve(__dirname, '../../node_modules'),
    // Shared klasörü
    path.resolve(__dirname, '../Bingo'),
  ],
  resolver: {
    extraNodeModules: {
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-native': path.resolve(__dirname, '../../node_modules/react-native'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);