import React from 'react';
import { View } from 'react-native';
import { Text, IconButton, Snackbar, Tooltip } from 'react-native-paper';
import styles from '../styles/ProfileScreenStyles';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../../components/CustomModal';
import useModal from '../../../hooks/useModal';
import useFriendsPage from './Friends/hooks/useFriendsPage';
import { useProfile } from '../context/ProfileContext';
import {useTheme} from '../../../context/ThemeContext';
import GrandientText from '../../../components/GrandientText';
const TopBar = () => {
    const navigation = useNavigation();
    const { modalVisible, modalMessage, modalTitle, showModal, closeModal } = useModal();
    const { handleAddFriend, error, snackbarVisible, setSnackbarVisible, snackbarMessage } = useFriendsPage();
    const { isEditMode, toggleEditMode } = useProfile();
    const { colors } = useTheme();

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
        <View style={[styles.topBar, { backgroundColor: colors.background }]}>
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
                iconColor={isEditMode ? colors.primary : colors.subText}
                style={styles.topBarIcon}
                onPress={toggleEditMode}
            />
            </Tooltip>
              <GrandientText
                        text="Profile"
                        colors={colors.gameCenterText}
                        textStyle={{ fontSize: 28 }}
                        gradientDirection="horizontal"
                      />
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                <Tooltip title="Add Friend">
                <IconButton icon="camera" size={24} iconColor={colors.subText} style={styles.topBarIcon} onPress={navigateToCamera} />
                </Tooltip>
                <Tooltip title="Options">
                <IconButton icon="dots-vertical" size={24} iconColor={colors.subText} style={styles.topBarIcon} />
                </Tooltip>
            </View>
        </View>
    );
};

export default TopBar;