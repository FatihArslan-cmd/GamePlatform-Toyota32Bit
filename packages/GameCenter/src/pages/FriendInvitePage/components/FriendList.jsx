import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, List } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";
import { useFriendInvite } from "../context/FriendInviteContext";

const TABLET_DEVICE = isTablet();

const FriendList = () => {
    const { colors } = useTheme(); 
    const styles = createStyles(colors); 
    const { friends, handleInvite } = useFriendInvite(); 
    const { t } = useTranslation();

    return (
        <List.Section>
            {friends.map((item) => (
                <List.Item
                    key={item.id.toString()}
                    title={item.username.toUpperCase()}
                    titleStyle={styles.username}
                    left={() => (
                        <Avatar.Image
                            size={TABLET_DEVICE ? 70 : 50}
                            source={{ uri: item.profilePhoto }}
                            style={styles.profileImageListItem}
                        />
                    )}
                    right={() => (
                        <View style={{ justifyContent: 'center' }}>
                            <Button
                                mode="contained"
                                onPress={() => handleInvite(item.id)}
                                style={styles.inviteButtonPaper}
                                labelStyle={styles.inviteButtonTextPaper}
                            >
                                {t('friendInvitePage.invite')}
                            </Button>
                        </View>
                    )}
                    style={styles.listItem}
                />
            ))}
        </List.Section>
    );
};

const createStyles = (themeColors) => StyleSheet.create({ 
    listItem: {
        backgroundColor: themeColors.card, 
        borderRadius: 25,
        marginBottom: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    profileImageListItem: {
        marginRight: 15,
    },
    username: {
        fontSize: TABLET_DEVICE ? 20 : 16,
        fontFamily: 'Orbitron-ExtraBold',
        color: themeColors.text, 
    },
    inviteButtonPaper: {
        borderRadius: 20,
        paddingHorizontal: 5,
        height: 35,
        backgroundColor: themeColors.primary, 
    },
    inviteButtonTextPaper: {
        color: 'white', 
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: TABLET_DEVICE ? 14 : 12,
    },
});

export default FriendList;