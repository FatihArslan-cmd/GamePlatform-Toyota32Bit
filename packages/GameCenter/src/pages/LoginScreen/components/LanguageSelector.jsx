import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Menu, Text, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";
import { storage } from "../../../utils/storage";

const TABLET_DEVICE = isTablet();

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
          <TouchableRipple
            onPress={openMenu}
            style={styles.button}
            rippleColor={colors.ripple} 
          >
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: TABLET_DEVICE ? 50 : 40,
    right: TABLET_DEVICE ? 30 : 15, 
    zIndex: 1000,
  },
  button: {
    backgroundColor: 'rgba(135, 135, 135, 0.1)', 
    paddingVertical: TABLET_DEVICE ? 10 : 6, 
    paddingHorizontal: TABLET_DEVICE ? 16 : 4,
    borderRadius: 5,
    minWidth: TABLET_DEVICE ? 60 : 50,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Orbitron-ExtraBold', 
    fontSize: TABLET_DEVICE ? 14 : 10,
  },
  menuItemText: {
    fontFamily: 'Orbitron-ExtraBold', 
    fontSize: TABLET_DEVICE ? 14 : 13, 
  },
  menuContent: {
    marginTop: TABLET_DEVICE ? 5 : 4, 
  },
});

export default LanguageSelector;