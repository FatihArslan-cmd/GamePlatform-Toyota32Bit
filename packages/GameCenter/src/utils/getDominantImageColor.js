import { NativeModules } from 'react-native';

const { DominantColor } = NativeModules;

const getDominantImageColor = async (imagePath) => {
  try {
    const dominantColorHex = await DominantColor.getDominantColor(imagePath);
    return dominantColorHex;
  } catch (e) {
    console.error("Baskın renk alınırken hata:", e);
    return null;
  }
};

export default getDominantImageColor;