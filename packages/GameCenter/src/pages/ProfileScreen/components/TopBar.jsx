import React from 'react';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import styles from '../styles/ProfileScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../../shared/states/api';
import axios from 'axios';
import CustomModal from '../../../components/CustomModal';
import useModal from '../../../hooks/useModal';

const TopBar = () => {
    const navigation = useNavigation();
    const { modalVisible, modalMessage, modalTitle, showModal, closeModal } = useModal();


    const navigateToCamera = () => {
        navigation.navigate('BarcodeScan', {
            onBarcodeScanned: handleBarcodeScanned,
        });
    };

     const handleBarcodeScanned = async (barcodeValue) => {
        const token = getToken();
    
        try {
             const response = await axios.post('http://10.0.2.2:3000/api/add-friend', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token}`
                },
                data: { friendCode: barcodeValue },
              });
    
            if (response.status === 200) {
                 showModal('success', 'Başarılı', response.data.message);
             } else {
                 showModal('error', 'Hata', response.data.message || 'Arkadaş ekleme başarısız.');
            }
        } catch (error) {
               console.error('Fetch error:', error);
               showModal('error', 'Hata', 'Arkadaş eklenirken bir sorun oluştu.Lütfen tekrar deneyiniz.');
        }
         finally {
               navigation.goBack();
        }
    };

    return (
        <View style={styles.topBar}>
             <CustomModal
                visible={modalVisible}
                onDismiss={closeModal}
                title={modalTitle}
                text={modalMessage}
                showConfirmButton={false} 
            />
            <IconButton icon="pencil" size={24} iconColor="#a5a7ac" style={styles.topBarIcon} />
            <Text style={styles.title}>Profile</Text>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                <IconButton icon="camera" size={24} iconColor="#a5a7ac" style={styles.topBarIcon} onPress={navigateToCamera} />
                <IconButton icon="dots-vertical" size={24} iconColor="#a5a7ac" style={styles.topBarIcon} />
            </View>
        </View>
    );
};

export default TopBar;