import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, Text, TouchableRipple } from 'react-native-paper';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { storage } from '../../../utils/storage';

const LanguageSelector = () => {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const { t, i18n } = useTranslation(); 

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeLanguage = (value) => {
    i18n.changeLanguage(value)
      .then(() => storage.set('language', value))
      .catch(err => console.log(err))
      .finally(closeMenu);
  };
  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableRipple onPress={openMenu} style={[styles.button]}>
            <Text style={[styles.buttonText, { color: colors.text }]}>
              {i18n.language.toUpperCase()}
            </Text>
          </TouchableRipple>
        }
        contentStyle={[styles.menuContent, { backgroundColor: colors.card }]}
      >
        <Menu.Item
          onPress={() => changeLanguage('tr')}
          title={t('loginScreen.turkish')} 
          titleStyle={[styles.menuItemText, { color: colors.text }]}
        />
        <Menu.Item
          onPress={() => changeLanguage('en')}
          title={t('loginScreen.english')} 
          titleStyle={[styles.menuItemText, { color: colors.text }]}
        />
        <Menu.Item
          onPress={() => changeLanguage('de')}
          title={t('loginScreen.german')} 
          titleStyle={[styles.menuItemText, { color: colors.text }]}
        />
      </Menu>
    </View>
  );
};

// Styles kısmı aynı kalıyor
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