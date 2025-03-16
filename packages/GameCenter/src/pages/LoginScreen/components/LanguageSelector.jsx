import React, { useState } from 'react';
import { StyleSheet , View } from 'react-native';
import { Menu , Text , TouchableRipple} from 'react-native-paper';
import { useTheme } from '../../../context/ThemeContext';

const LanguageSelector = () => {
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('TR');
  const { colors } = useTheme();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableRipple onPress={openMenu} style={[styles.button]}>
            <Text style={[styles.buttonText, { color: colors.text }]}>{selectedLanguage}</Text>
          </TouchableRipple>
        }
        contentStyle={[styles.menuContent, { backgroundColor: colors.card }]}
      >
        <Menu.Item
          onPress={() => handleLanguageSelect('TR')}
          title="Türkçe"
          titleStyle={[styles.menuItemText, { color: colors.text }]}
        />
        <Menu.Item
          onPress={() => handleLanguageSelect('EN')}
          title="English"
          titleStyle={[styles.menuItemText, { color: colors.text }]}
        />
        <Menu.Item
          onPress={() => handleLanguageSelect('DE')}
          title="Deutsch"
          titleStyle={[styles.menuItemText, { color: colors.text }]}
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1000,
  },
  button: {
    backgroundColor: 'rgba(135, 135, 135, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Default text color, will be overridden by theme color
    fontFamily: 'Orbitron-ExtraBold',
  },
  menuItemText: {
    fontFamily: 'Orbitron-ExtraBold',
  },
  menuContent: {
    marginTop: 75,
  },
});

export default LanguageSelector;