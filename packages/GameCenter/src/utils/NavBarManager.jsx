import { NativeModules } from 'react-native';
const { NavigationBarModule } = NativeModules;

export const hideNavigationBar = () => {
    NavigationBarModule.setNavigationBarVisibility(false);
  };


export const showNavigationBar = () => {
    NavigationBarModule.setNavigationBarVisibility(true);
  };

/**
 * Set the Android navigation bar color and icon theme.
 * @param {string} color - The hex color code for the navigation bar (e.g., "#FFFFFF").
 * @param {boolean} lightIcons - Whether to use light icons (true) or dark icons (false).
 */
export const setNavigationBar = (color, lightIcons) => {
      NavigationBarModule.setNavigationBarColor(color, lightIcons);
  };