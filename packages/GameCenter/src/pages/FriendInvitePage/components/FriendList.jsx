import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Avatar, Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const FriendList = ({ friends, handleInvite }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors); // Create styles within the component scope

    return (
        <List.Section>
            {friends.map((item) => (
                <List.Item
                    key={item.id.toString()}
                    title={item.username.toUpperCase()}
                    titleStyle={styles.username}
                    left={() => (
                        <Avatar.Image
                            size={70}
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
                                Invite
                            </Button>
                        </View>
                    )}
                    style={styles.listItem}
                />
            ))}
        </List.Section>
    );
};

const createStyles = (colors) => StyleSheet.create({ // Styles are now function based
    listItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
        fontSize: 22,
        fontFamily: 'Orbitron-ExtraBold',
        color: '#333',
    },
    inviteButtonPaper: {
        borderRadius: 20,
        paddingHorizontal: 5,
        height: 35,
    },
    inviteButtonTextPaper: {
        color: 'white',
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: 14,
    },
});

export default FriendList;