import React from 'react';
import { View } from 'react-native';
import { Text, IconButton, Snackbar,Tooltip } from 'react-native-paper';
import styles from '../styles/ProfileScreenStyles';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../../components/CustomModal';
import useModal from '../../../hooks/useModal';
import useFriendsPage from '../hooks/useFriendsPage';

const TopBar = ({ onPencilPress, isEditMode }) => { // Receive onPencilPress and isEditMode as props
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
            <Tooltip title="Update">
            <IconButton
                icon="pencil"
                size={24}
                iconColor={isEditMode ? "#6200ee" : "#a5a7ac"} // Change color when edit mode is on
                style={styles.topBarIcon}
                onPress={onPencilPress} // Call the prop function
            />
            </Tooltip>
            <Text style={styles.title}>Profile</Text>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                <Tooltip title="Add Friend"> 
                <IconButton icon="camera" size={24} iconColor="#a5a7ac" style={styles.topBarIcon} onPress={navigateToCamera} />
                </Tooltip>
                <Tooltip title="Options">
                <IconButton icon="dots-vertical" size={24} iconColor="#a5a7ac" style={styles.topBarIcon} />
                </Tooltip>
            </View>
        </View>
    );
};

export default TopBar;