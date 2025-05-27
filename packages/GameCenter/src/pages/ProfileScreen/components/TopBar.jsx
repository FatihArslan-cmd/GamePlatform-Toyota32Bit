import CustomModal from "../../../components/CustomModal";
import GrandientText from "../../../components/GrandientText";
import React from "react";
import styles from "../styles/ProfileScreenStyles";
import useFriendsPage from "./Friends/hooks/useFriendsPage";
import useModal from "../../../hooks/useModal";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { IconButton, Snackbar, Tooltip } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";
import { useProfile } from "../context/ProfileContext";

const TABLET_DEVICE = isTablet();

const TopBar = () => {
    const navigation = useNavigation();
    const { modalVisible, modalMessage, modalTitle, showModal, closeModal } = useModal();
    const { handleAddFriend, error, snackbarVisible, setSnackbarVisible, snackbarMessage } = useFriendsPage();
    const { isEditMode, toggleEditMode } = useProfile();
    const { colors } = useTheme();
    const { t } = useTranslation();

    const navigateToCamera = () => {
        navigation.navigate('BarcodeScan', {
            onBarcodeScanned: handleBarcodeScanned,
        });
    };

    const navigateToStatics = () => {
        navigation.navigate('StaticsScreen');
    };

    const handleBarcodeScanned = async (barcodeValue) => {
        try {
            await handleAddFriend(barcodeValue);

            if (error) {
                showModal('error', 'Hata', error);
            } else {
                showModal('success', 'Başarılı', snackbarMessage || t('profileScreen.friendAddedSuccess'));
            }

        } catch (err) {
            showModal('error', 'Hata', t('profileScreen.friendAddError'));
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

            <Tooltip title={t('profileScreen.editProfileTooltip')}>
                <IconButton
                    icon="pencil"
                    size={TABLET_DEVICE ? 24 : 18}
                    iconColor={isEditMode ? colors.primary : colors.text}
                    style={styles.topBarIcon}
                    onPress={toggleEditMode}
                />
            </Tooltip>

            <GrandientText
                text={t('profileScreen.profile')}
                colors={colors.gameCenterText}
                textStyle={{ fontSize: TABLET_DEVICE ? 28 : 20 }}
                gradientDirection="horizontal"
            />

            <View style={{ flexDirection: "row", alignSelf: "flex-end", marginBottom: 10 }}>
                <Tooltip title={t('profileScreen.addFriendTooltip')}>
                    <IconButton
                        icon="camera"
                        size={TABLET_DEVICE ? 24 : 18}
                        iconColor={colors.text}
                        style={styles.topBarIcon}
                        onPress={navigateToCamera}
                    />
                </Tooltip>

                <Tooltip title={t('profileScreen.staticsTooltip')}>
                    <IconButton
                        icon="chart-bar"
                        size={TABLET_DEVICE ? 24 : 18}
                        iconColor={colors.text}
                        style={styles.topBarIcon}
                        onPress={navigateToStatics}
                    />
                </Tooltip>
            </View>
        </View>
    );
};

export default TopBar;