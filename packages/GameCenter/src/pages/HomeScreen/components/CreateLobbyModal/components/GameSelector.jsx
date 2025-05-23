import React from "react";
import { useState } from "react";
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const GameSelector = ({
    gameName,
    lobbyName,
    maxCapacity,
    onGameNameChange,
    onLobbyNameChange,
    onMaxCapacityChange,
    t 
}) => {
    const [pressedScale] = useState(new Animated.Value(1));
    const games = ['Bingo', 'Chess', 'Poker', 'Checkers', 'Monopoly', 'Scrabble', 'Clue', 'Risk', 'Catan', 'Ticket to Ride'];
    const { colors } = useTheme();

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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.gameSelectorContainer, { backgroundColor: 'transparent' }]}>
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
                                { backgroundColor: colors.primary },
                                gameName === game && styles.gameButtonSelected,
                            ]}
                            onPress={() => onGameNameChange(game)}
                        >
                            <Text style={[
                                styles.gameButtonText,
                                { color: colors.card },
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
                    <Text style={{ color: colors.text }}>{t('createLobbyModal.gameSelector.lobbyName')}</Text> 
                }
                mode="outlined"
                value={lobbyName}
                placeholder={t('createLobbyModal.gameSelector.lobbyNamePlaceholder')} 
                left={<TextInput.Icon icon="home" color={colors.primary} />}
                style={[styles.input, { backgroundColor: colors.card }]}
                onChangeText={onLobbyNameChange}
                outlineColor={colors.border}
                activeOutlineColor={colors.primary}
                textColor={colors.text}
                placeholderTextColor={colors.subText}
            />

            <TextInput
                label={
                    <Text style={{ color: colors.text }}>{t('createLobbyModal.gameSelector.maxCapacity')}</Text> 
                }
                mode="outlined"
                value={maxCapacity}
                placeholder={t('createLobbyModal.gameSelector.maxCapacityPlaceholder')} 
                keyboardType="numeric"
                left={<TextInput.Icon icon="account-group" color={colors.primary} />}
                right={<TextInput.Icon icon="information" color={colors.primary} />}
                style={[styles.input, { backgroundColor: colors.card }]}
                onChangeText={onMaxCapacityChange}
                outlineColor={colors.border}
                activeOutlineColor={colors.primary}
                textColor={colors.text}
                placeholderTextColor={colors.subText}
                
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
        backgroundColor: 'transparent',
    },
    gameSelectorLabel: {
        marginBottom: 12,
        fontSize: TABLET_DEVICE ? 18 : 12,
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
        fontSize: TABLET_DEVICE ? 16 : 12,
        color: '#333',
        fontFamily: 'Orbitron-ExtraBold',
    },
    gameButtonTextSelected: {
        color: '#fff',
    },
});

export default GameSelector;