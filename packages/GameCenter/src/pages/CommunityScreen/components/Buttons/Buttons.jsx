import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper'; // Text'i ekleyin

const Buttons = ({ goToHome, goToExplorer }) => {
  const buttonTextStyle = {
    fontFamily: 'Orbitron-ExtraBold'
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        <Button onPress={goToHome} mode="text" style={styles.button}>
          <Text style={buttonTextStyle}>Home</Text> {/* Text bileşeni ile yazı tipini uygulayın */}
        </Button>
        <Button onPress={goToExplorer} mode="text" style={styles.button}>
          <Text style={buttonTextStyle}>Explorer</Text> {/* Text bileşeni ile yazı tipini uygulayın */}
        </Button>
      </View>
      <Divider style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 90,
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  divider: {
    height: 2,
    width: '100%',
    marginTop: 7,
  },
});

export default Buttons;