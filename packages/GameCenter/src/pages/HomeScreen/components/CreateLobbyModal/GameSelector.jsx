import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { useState, useRef } from 'react';

const GameSelector = ({
    gameName,
    lobbyName,
    maxCapacity,
    onGameNameChange,
    onLobbyNameChange,
    onMaxCapacityChange,
    editableGameName,
}) => {
    const [pressedScale] = useState(new Animated.Value(1));
    const games = ['Bingo', 'Chess', 'Poker', 'Checkers', 'Monopoly', 'Scrabble', 'Clue', 'Risk', 'Catan', 'Ticket to Ride'];

    const handlePressIn = () => {
        Animated.spring(pressedScale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(pressedScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.gameSelectorLabel}>Game Selection</Text>
            <View style={styles.gameSelectorContainer}>
                <ScrollView 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollViewContent}
                    fadingEdgeLength={50} // fadingEdgeLength is correctly placed here to add fade effect at the edges of horizontal scroll.

                >
                    {games.map((game, index) => (
                        <TouchableOpacity
                            key={index}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            style={[
                                styles.gameButton,
                                gameName === game && styles.gameButtonSelected
                            ]}
                            onPress={() => onGameNameChange(game)}
                        >
                            <Text style={[
                                styles.gameButtonText,
                                gameName === game && styles.gameButtonTextSelected
                            ]}>
                                {game}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <TextInput
                label="Lobby Name"
                mode="outlined"
                value={lobbyName}
                placeholder="Create your lobby name..."
                left={<TextInput.Icon icon="home" color="#8a2be2" />}
                style={styles.input}
                onChangeText={onLobbyNameChange}
                outlineColor="#8a2be2"
                activeOutlineColor="#8a2be2"
            />

            <TextInput
                label="Max Players"
                mode="outlined"
                value={maxCapacity}
                placeholder="Set player limit..."
                keyboardType="numeric"
                left={<TextInput.Icon icon="account-group" color="#8a2be2" />}
                right={<TextInput.Icon icon="information" color="#8a2be2" />}
                style={styles.input}
                onChangeText={onMaxCapacityChange}
                outlineColor="#8a2be2"
                activeOutlineColor="#8a2be2"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    gameSelectorContainer: {
        marginBottom: 24,
        borderRadius: 12,
        padding: 8,
    },
    gameSelectorLabel: {
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#8a2be2',
        fontFamily: 'Orbitron-ExtraBold',
    },
    scrollViewContent: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    gameButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: '#fff',
        marginRight: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    gameButtonSelected: {
        backgroundColor: '#8a2be2',
        borderColor: '#8a2be2',
    },
    gameButtonText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Orbitron-ExtraBold',
    },
    gameButtonTextSelected: {
        color: '#fff',
    },
});

export default GameSelector;