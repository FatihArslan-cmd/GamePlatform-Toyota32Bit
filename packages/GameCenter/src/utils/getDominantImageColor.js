import { NativeModules } from 'react-native';

const { DominantColor } = NativeModules;

const getDominantColorsFromQuadrants = async (imagePath) => {
  try {
    const dominantColorHexArray = await DominantColor.getDominantColorFromQuadrants(imagePath);
    return dominantColorHexArray;
  } catch (e) {
    console.error("Baskın renkler alınırken hata:", e);
    return null;
  }
};

export default getDominantColorsFromQuadrants;