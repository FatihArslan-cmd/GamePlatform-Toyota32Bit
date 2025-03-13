import React, { useState } from 'react';
import { StyleSheet , View } from 'react-native';
import { Menu, Provider , Text , TouchableRipple} from 'react-native-paper';

const LanguageSelector = () => {
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('TR');

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
          <TouchableRipple onPress={openMenu} style={styles.button}>
            <Text style={styles.buttonText}>{selectedLanguage}</Text>
          </TouchableRipple>
        }
        contentStyle={styles.menuContent} 
      >
        <Menu.Item
          onPress={() => handleLanguageSelect('TR')}
          title="Türkçe"
          titleStyle={styles.menuItemText}
        />
        <Menu.Item
          onPress={() => handleLanguageSelect('EN')}
          title="English"
          titleStyle={styles.menuItemText} 
        />
        <Menu.Item
          onPress={() => handleLanguageSelect('DE')}
          title="Deutsch"
          titleStyle={styles.menuItemText}
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
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