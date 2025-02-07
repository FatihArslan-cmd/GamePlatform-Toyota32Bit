import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import getDominantColorsFromQuadrants from '../../utils/getDominantImageColor';

const SettingsScreen = () => {
  const [dominantColors, setDominantColors] = useState([]);
  const imageURL = "https://randomuser.me/api/portraits/women/32.jpg";
  const imageSource = { uri: imageURL };

  const handleGetDominantColors = async () => {
    try {
      const colors = await getDominantColorsFromQuadrants(imageURL);
      if (colors && colors.length === 4) {
        setDominantColors(colors);
      } else {
        setDominantColors(['#CCCCCC', '#EEEEEE', '#AAAAAA', '#FFFFFF']);
      }
    } catch (error) {
      console.error("Baskın renkler alınırken hata oluştu:", error);
      setDominantColors(['#CCCCCC', '#EEEEEE', '#AAAAAA', '#FFFFFF']);
    }
  };

  useEffect(() => {
    handleGetDominantColors();
  }, []);

  const quadrantLabels = ["Sol Üst", "Sağ Üst", "Sol Alt", "Sağ Alt"];

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        {dominantColors.length === 4 && (
          <LinearGradient
            colors={dominantColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.3, 0.6, 1]}
            style={styles.gradientContainer}
          >
            <View style={styles.imageCard}>
              <Image source={imageSource} style={styles.image} resizeMode="cover" />
              <View style={styles.quadrantOverlay}>
                <View style={styles.quadrantLine} />
                <View style={[styles.quadrantLine, styles.verticalLine]} />
              </View>
            </View>
          </LinearGradient>
        )}
      </View>

      <View style={styles.colorGridContainer}>
        {dominantColors.map((color, index) => (
          <View key={index} style={styles.colorColumn}>
            <View style={[styles.quadrantColorBox, { backgroundColor: color }]} />
            <Text style={styles.quadrantLabel}>{quadrantLabels[index]}</Text>
            <Text style={styles.quadrantColorCode}>{color}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cardWrapper: {
    width: 360,  // Gradient container daha geniş
    height: 380, // Gradient container daha yüksek
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  gradientContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCard: {
    width: 300,  // Resim boyutu sabit
    height: 300, // Resim boyutu sabit
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  quadrantOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    borderColor: '#888',
    borderWidth: 0.5,
  },
  quadrantLine: {
    flex: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#888',
  },
  verticalLine: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0,
    height: '100%',
  },
  colorGridContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  colorColumn: {
    alignItems: 'center',
  },
  quadrantColorBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 8,
  },
  quadrantLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },
  quadrantColorCode: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
});

export default SettingsScreen;