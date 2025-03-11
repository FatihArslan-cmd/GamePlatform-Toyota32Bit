import { NativeEventEmitter, NativeModules } from 'react-native';

export const HandleNFCRead = async () => {
  const { NFCReaderModule } = NativeModules;
  const nfcEventEmitter = new NativeEventEmitter(NFCReaderModule);

  return new Promise((resolve, reject) => {
    try {
      NFCReaderModule.startListening();

      const subscription = nfcEventEmitter.addListener('onNfcTagDetected', async (data) => {
        console.log('NFC Tag Detected:', data);

        const acceptedId = "047bc81b6f6180"; 
        if (data.id === acceptedId) {
          console.log('NFC ID doğrulandı:', data.id);
          subscription.remove();
          NFCReaderModule.stopListening();
          resolve(true);
        } else {
          console.log('Geçersiz NFC ID:', data.id);
          subscription.remove();
          NFCReaderModule.stopListening();
          resolve(false);
        }
      });
    } catch (error) {
      console.error('Error during NFC reading:', error);
      NFCReaderModule.stopListening();
      reject(false);
    }
  });
};
