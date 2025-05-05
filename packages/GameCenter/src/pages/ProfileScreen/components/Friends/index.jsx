import EmptyState from "../../../../components/EmptyState";
import FriendAddModal from "./components/FriendModals/FriendAddModal";
import FriendDetailsModal from "./components/FriendModals/FriendDetailsModal";
import FriendItem from "./components/FrientItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InputField from "../../../LoginScreen/components/FormSection/components/InputField";
import InviteModal from "./components/FriendModals/InviteModal";
import React, { useEffect, useState } from "react";
import styles from "../../styles/FriendPageStyles";
import useFriendsPage from "./hooks/useFriendsPage";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { Button, Text, Tooltip, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { ToastService } from "../../../../context/ToastService";
import { isTablet } from "../../../../utils/isTablet";
import { useButtons } from "../context/ButtonsContext";

const TABLET_DEVICE = isTablet();

const FriendsPage = () => {
    const {
        modalVisible,
        friendCode,
        loading,
        error,
        friends,
        selectedFriend,
        friendModalVisible,
        handleInvitePress,
        handleCopyCode,
        handleModalDismiss,
        handleShareCode,
        handleFriendPress,
        handleFriendModalDismiss,
        handleRemoveFriend,
        handleAddFriend,
        handleSearchChange
    } = useFriendsPage();
    const { handleFriendCountChange } = useButtons();
    const { colors } = useTheme();
    const { t } = useTranslation();

    const [addModalVisible, setAddModalVisible] = useState(false);

    useEffect(() => {
        handleFriendCountChange(friends.length);
    }, [friends, handleFriendCountChange]);

    const handleOpenAddModal = () => {
        setAddModalVisible(true);
    };

    const handleCloseAddModal = () => {
        setAddModalVisible(false);
    };

    useEffect(() => {
        if (error) {
            ToastService.show("error", error);
        }
    }, [error]);


    return (
        <View style={styles.container}>
            <InviteModal
                visible={modalVisible}
                onDismiss={handleModalDismiss}
                friendCode={friendCode}
                onCopyCode={handleCopyCode}
                onShareCode={handleShareCode}
                colors={colors}
            />
            <FriendDetailsModal
                visible={friendModalVisible}
                onDismiss={handleFriendModalDismiss}
                selectedFriend={selectedFriend}
                onRemoveFriend={handleRemoveFriend}
            />
            <View style={styles.searchContainer}>
                <InputField
                    label={t('profileScreen.searchFriends')} 
                    leftIcon="magnify"
                    style={styles.input}
                    onChangeText={handleSearchChange}
                    rightIcon={() => (
                        <Tooltip title='Add friends' > 
                        <TouchableRipple onPress={handleOpenAddModal}>
                            <Icon name="plus" size={TABLET_DEVICE ? 28 : 20} color={colors.primary} />
                        </TouchableRipple>
                        </Tooltip>
                    )}
                />
            </View>

            <FriendAddModal
                visible={addModalVisible}
                onDismiss={handleCloseAddModal}
                onAddFriend={handleAddFriend}
                setAddModalVisible={setAddModalVisible}
            />
            <Button
                mode="contained"
                style={[styles.inviteButton, { backgroundColor: `${colors.primary}` }]}
                buttonColor={colors.primary}
                labelStyle={[styles.inviteButtonText, { color: 'white', opacity: 0.80, fontFamily:'Orbitron-ExtraBold' }]}
                icon={() => <Icon name="link-variant" color='white' size={TABLET_DEVICE ? 24 : 20} />}
                iconPosition="trailing"
                onPress={handleInvitePress}
                loading={loading}
                disabled={loading}
            >
                {t('profileScreen.getalinktoinviteusers')} 
            </Button>
            <FlatList
                data={friends}
                renderItem={({ item }) => (
                  <FriendItem
                    item={item}
                    colors={colors}
                    onPress={() => handleFriendPress(item)}
                />
                )}
                keyExtractor={(item) => item.id.toString()}
                style={styles.friendsList}
                ListEmptyComponent={() => <EmptyState textColor={colors.text} message={t('profileScreen.noFriendsYet')}/>} // Translated "Henüz arkadaşın yok!"
            />
        </View>
    );
};


export default FriendsPage;