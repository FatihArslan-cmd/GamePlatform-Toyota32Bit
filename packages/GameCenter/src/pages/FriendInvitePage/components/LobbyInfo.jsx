import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FadeIn from '../../../components/Animations/FadeInAnimation';

const LobbyInfo = ({ userLobby }) => {
   
    return (
        <FadeIn>
        <View style={styles.lobbyInfoContainer}>
            <Text style={styles.lobbyInfoText}>
                You are in a lobby named {userLobby.lobbyName}.
            </Text>
            <Text style={styles.lobbyInfoText}>
                {userLobby.maxCapacity - userLobby.members.length} kişilik boş yer var!
            </Text>
        </View>
        </FadeIn>
    );
};
const styles = StyleSheet.create({ // Styles are now local to this component
    lobbyInfoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    lobbyInfoText: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Orbitron-Medium',
    },
});

export default LobbyInfo;