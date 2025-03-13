import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { useState, useRef } from 'react';
import { useTheme } from '../../../../../context/ThemeContext'; // Import useTheme

const GameSelector = ({
    gameName,
    lobbyName,
    maxCapacity,
    onGameNameChange,
    onLobbyNameChange,
    onMaxCapacityChange,
}) => {
    const [pressedScale] = useState(new Animated.Value(1));
    const games = ['Bingo', 'Chess', 'Poker', 'Checkers', 'Monopoly', 'Scrabble', 'Clue', 'Risk', 'Catan', 'Ticket to Ride'];
    const { colors } = useTheme(); // Use the useTheme hook
    console.log('GameSelector rendered');

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
        <View style={[styles.container, { backgroundColor: colors.background }]}> {/* Themed container background */}
            <Text style={styles.gameSelectorLabel}>Game Selection</Text> {/* Themed gameSelectorLabel text color */}
            <View style={[styles.gameSelectorContainer, { backgroundColor: 'transparent' }]}> {/* Transparent game selector container background */}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                    fadingEdgeLength={50}
                >
                    {games.map((game, index) => (
                        <TouchableOpacity
                            key={index}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            style={[
                                styles.gameButton,
                                { backgroundColor: colors.primary }, // Themed game button background color
                                gameName === game && styles.gameButtonSelected,
                            ]}
                            onPress={() => onGameNameChange(game)}
                        >
                            <Text style={[
                                styles.gameButtonText,
                                { color: colors.card }, // Themed game button text color to contrast with button background
                                gameName === game && styles.gameButtonTextSelected,
                            ]}>
                                {game}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <TextInput
                label={
                         <Text style={{ color: colors.text }}>Lobby Name</Text>
                       } 
                mode="outlined"
                value={lobbyName}
                placeholder="Create your lobby name..."
                left={<TextInput.Icon icon="home" color={colors.primary} />} // Themed icon color
                style={[styles.input, { backgroundColor: colors.card }]} // Themed input background
                onChangeText={onLobbyNameChange}
                outlineColor={colors.border} // Themed outline color
                activeOutlineColor={colors.primary} // Themed active outline color
                textColor={colors.text} // Themed text color
                placeholderTextColor={colors.subText} // Themed placeholder text color
            />

            <TextInput
                label={
                         <Text style={{ color: colors.text }}>Max Players</Text>
                       } 
                mode="outlined"
                value={maxCapacity}
                placeholder="Set player limit..."
                keyboardType="numeric"
                left={<TextInput.Icon icon="account-group" color={colors.primary} />} // Themed icon color
                right={<TextInput.Icon icon="information" color={colors.primary} />} // Themed icon color
                style={[styles.input, { backgroundColor: colors.card }]} // Themed input background
                onChangeText={onMaxCapacityChange}
                outlineColor={colors.border} // Themed outline color
                activeOutlineColor={colors.primary} // Themed active outline color
                textColor={colors.text} // Themed text color
                placeholderTextColor={colors.subText} // Themed placeholder text color
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff', // Removed hardcoded white, will be set by theme in component
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'white', // Removed hardcoded white, will be set by theme in component
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
        backgroundColor: 'transparent', // Set to transparent as requested
    },
    gameSelectorLabel: {
        marginBottom: 12,
        fontSize: 18,
        fontWeight: '600',
        color: '#8a2be2', // Removed hardcoded color, will be set by theme in component
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
        backgroundColor: '#fff', // Removed hardcoded white, will be set by theme in component
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
        backgroundColor: '#8a2be2', // Kept original color as it seems to be part of the brand
        borderColor: '#8a2be2',     // Kept original color as it seems to be part of the brand
    },
    gameButtonText: {
        fontSize: 16,
        color: '#333', // Removed hardcoded dark gray, will be set by theme in component
        fontFamily: 'Orbitron-ExtraBold',
    },
    gameButtonTextSelected: {
        color: '#fff', // Kept original color as it seems to be part of the brand
    },
});

export default GameSelector;