import React from 'react';
import { View } from 'react-native';
import { Text, IconButton, Snackbar } from 'react-native-paper'; // Snackbar eklendi
import styles from '../styles/ProfileScreenStyles';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../../components/CustomModal';
import useModal from '../../../hooks/useModal';
import useFriendsPage from '../hooks/useFriendsPage';

const TopBar = () => {
    const navigation = useNavigation();
    const { modalVisible, modalMessage, modalTitle, showModal, closeModal } = useModal();
    const { handleAddFriend, error, snackbarVisible, setSnackbarVisible, snackbarMessage } = useFriendsPage();

    const navigateToCamera = () => {
        navigation.navigate('BarcodeScan', {
            onBarcodeScanned: handleBarcodeScanned,
        });
    };

    const handleBarcodeScanned = async (barcodeValue) => {
        try {
            await handleAddFriend(barcodeValue);

            if (error) {
                showModal('error', 'Hata', error);
            } else {
                showModal('success', 'Başarılı', snackbarMessage || 'Arkadaş başarıyla eklendi.');
            }

        } catch (err) {
            console.error('Arkadaş ekleme hatası:', err);
            showModal('error', 'Hata', 'Arkadaş eklenirken bir sorun oluştu. Lütfen tekrar deneyin.');
        } finally {
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
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
            >
                {snackbarMessage}
            </Snackbar>

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