import { NativeModules} from 'react-native';

const { FingerprintModule } = NativeModules;

export const authenticateWithFingerprint = async () => {
    return new Promise((resolve) => {
      FingerprintModule.authenticateFingerPrint((result) => {
        if (result === 'Success') {
          resolve(true); 
        } else {
          resolve(false); 
        }
      });
    });
  };
  
  
  
