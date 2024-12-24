import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';

const AppBarExample = React.memo(() => {
  const [visible, setVisible] = useState(false);

  const handleSearchPress = useCallback(() => {
    console.log('Arama düğmesine basıldı');
  }, []);

  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);

  return (
    <View style={styles.container}>
      <BlurView
        style={styles.blurContainer}
        blurType="light"
        blurAmount={2}
        reducedTransparencyFallbackColor="white"
      >
        <Appbar.Header style={styles.appbar}>
          <Appbar.Action 
            icon="magnify" 
            onPress={handleSearchPress} 
            color="gray" 
          />
          <Appbar.Content 
            title="GameCenter" 
            titleStyle={styles.title}
          />
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action 
                icon="dots-vertical" 
                onPress={openMenu} 
                color="gray" 
              />
            }
            style={styles.menu}
          >
            <Menu.Item onPress={() => {}} title="Settings"             titleStyle={styles.title}
 />
            <Divider />
            <Menu.Item onPress={() => {}} title="Help & Display"             titleStyle={styles.title}
 />
          </Menu>
        </Appbar.Header>
      </BlurView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  title: {
    color: 'black',
    fontFamily: 'Orbitron-VariableFont_wght', // Font set to SQR721B
    textAlign: 'center',
  },
  menu: {
    marginTop: 40, 
  },
});

export default AppBarExample;
