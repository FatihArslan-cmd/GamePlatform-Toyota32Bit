import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import InputField from '../FormSectionItem/InputField';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../../../utils/storage';

const CreateQRcodeScreen = ({ route }) => {
    const [text, setText] = useState('');
    const [qrCodeValue, setQrCodeValue] = useState('');
    const navigation = useNavigation();
    const [isQrCodeGenerated, setIsQrCodeGenerated] = useState(false);

    const { onBarcodeSuccess } = route.params || {};


    const generateQrCode = () => {
        if (text.trim() === '') {
            Alert.alert('Hata', 'Lütfen geçerli bir metin girin.');
            return;
        }
        setQrCodeValue(text);
        setIsQrCodeGenerated(true);
    };

    const confirmQrCode = async () => {
      try {
        storage.set('qrCode', qrCodeValue);
        navigation.navigate('BarcodeScan', {
            onBarcodeSuccess: async () => {
             if (onBarcodeSuccess) {
              await onBarcodeSuccess();
               }
            }
         });
      }
      catch(error)
      {
         console.error('QR code confirm error', error)
      }
    };


    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <InputField
                        label="QR şifrenizi giriniz"
                        value={text}
                        onChangeText={setText}
                        style={styles.input}
                        leftIcon="text"
                        textColor="black"
                    />
                    <Button
                        mode="contained"
                        onPress={generateQrCode}
                        style={styles.button}
                        textColor="#fff"
                    >
                        QR Kod Oluştur
                    </Button>
                </Card.Content>
            </Card>


            {qrCodeValue ? (
                <Card style={styles.qrCard}>
                    <Card.Content style={styles.qrContent}>
                        <Text variant="bodyLarge" style={styles.qrTitle}>Oluşturulan QR Kod</Text>
                        <QRCode
                            value={qrCodeValue}
                            size={200}
                            backgroundColor="#383e4b"
                            color="white"
                        />
                         { isQrCodeGenerated && (
                           <Button
                            mode="contained"
                            onPress={confirmQrCode}
                            style={styles.confirmButton}
                            textColor="#fff"
                            >
                            Onayla
                         </Button>
                        )}
                    </Card.Content>
                </Card>
            ) : null
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#282c34',
        padding: 20,
    },
    card: {
        width: '90%',
        marginBottom: 20,
        backgroundColor: '#383e4b',
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#8a2be2',
    },
    qrCard: {
        width: '90%',
        backgroundColor: '#383e4b',
    },
    qrContent: {
        alignItems: 'center',
    },
    qrTitle: {
        color: '#fff',
        marginBottom: 10,
    },
      confirmButton: {
        marginTop: 35,
        backgroundColor: '#2ecc71',
    }
});

export default CreateQRcodeScreen;