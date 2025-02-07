import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import getDominantImageColor from '../../utils/getDominantImageColor'; // Doğru yolu kontrol edin

const SettingsScreen = () => {
  const [dominantColor, setDominantColor] = useState(null);
  const imageURL = "https://randomuser.me/api/portraits/women/16.jpg"; // Doğru URL formatı
  const imageSource = { uri: imageURL }; // Image component için doğru format

  const handleGetDominantColor = async () => {
    try {
      // Direkt olarak imageURL'yi getDominantImageColor fonksiyonuna verin.
      const color = await getDominantImageColor(imageURL);
      if (color) {
        setDominantColor(color);
      }
    } catch (error) {
      console.error("Baskın renk alınırken hata oluştu:", error);
      // Hata durumunda kullanıcıya bilgi verebilirsiniz.
      setDominantColor('#CCCCCC'); // Hata durumunda varsayılan bir renk ayarlayabilirsiniz.
    }
  };

  useEffect(() => {
    handleGetDominantColor();
  }, []);

  return (
    <View>
      <Image source={imageSource} style={{ width: 200, height: 200 }} />
      {dominantColor && (
        <View style={[styles.colorBox, { backgroundColor: dominantColor }]} />
      )}
      {dominantColor && <Text>Baskın Renk: {dominantColor}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
});

export default SettingsScreen;