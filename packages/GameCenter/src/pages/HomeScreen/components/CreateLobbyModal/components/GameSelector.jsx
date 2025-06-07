import React from "react";
import { useState } from "react";
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();
const CUSTOM_FONT_FAMILY = 'Orbitron-ExtraBold';

const GameSelector = ({
    gameName,
    lobbyName,
    maxCapacity,
    onGameNameChange,
    onLobbyNameChange,
    onMaxCapacityChange,
    t,
    defaultGameName
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
            {!defaultGameName && (
                <View style={[styles.gameSelectorContainer, { backgroundColor: 'transparent' }]}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContent}
                        fadingEdgeLength={50}
                    >
                        {games.map((game, index) => (
                            <Animated.View
                                key={index}
                                style={{
                                    transform: [{ scale: gameName === game ? 1 : pressedScale }],
                                    marginRight: 12,
                                }}
                            >
                                <TouchableOpacity
                                    onPressIn={handlePressIn}
                                    onPressOut={handlePressOut}
                                    style={[
                                        styles.gameButton,
                                        { backgroundColor: gameName === game ? colors.primary : colors.card },
                                        gameName === game && styles.gameButtonSelected,
                                    ]}
                                    onPress={() => onGameNameChange(game)}
                                >
                                    <Text style={[
                                        styles.gameButtonText,
                                        { color: gameName === game ? colors.card : colors.text },
                                        gameName === game && styles.gameButtonTextSelected,
                                    ]}>
                                        {game}
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </ScrollView>
                </View>
            )}

            <TextInput
                label={
                    <Text style={{ color: colors.text, fontFamily: CUSTOM_FONT_FAMILY }}>
                        {t('createLobbyModal.gameSelector.lobbyName')}
                    </Text>
                }
                mode="outlined"
                value={lobbyName}
                placeholder={t('createLobbyModal.gameSelector.lobbyNamePlaceholder')}
                left={<TextInput.Icon icon="home" color={colors.primary} />}
                right={
                    lobbyName && lobbyName.length > 0 ? (
                        <TextInput.Icon
                            icon="close"
                            color={colors.text}
                            onPress={() => onLobbyNameChange('')}
                        />
                    ) : null
                }
                style={[styles.inputContainer, { backgroundColor: colors.card }]}
                onChangeText={onLobbyNameChange}
                outlineColor={colors.border}
                activeOutlineColor={colors.primary}
                textColor={colors.text}
                placeholderTextColor={colors.subText}
                contentStyle={{
                    fontFamily: CUSTOM_FONT_FAMILY,
                    color: colors.text,
                }}
                renderToHardwareTextureAndroid={true}
            />

            <TextInput
                label={
                    <Text style={{ color: colors.text, fontFamily: CUSTOM_FONT_FAMILY }}>
                        {t('createLobbyModal.gameSelector.maxCapacity')}
                    </Text>
                }
                mode="outlined"
                value={maxCapacity}
                placeholder={t('createLobbyModal.gameSelector.maxCapacityPlaceholder')}
                keyboardType="numeric"
                left={<TextInput.Icon icon="account-group" color={colors.primary} />}
                right={
                     maxCapacity && maxCapacity.length > 0 ? (
                        <TextInput.Icon
                            icon="close"
                            color={colors.text}
                            onPress={() => onMaxCapacityChange('')}
                        />
                    ) : (
                         <TextInput.Icon
                             icon="information"
                             color={colors.primary}
                         />
                     )
                }
                style={[styles.inputContainer, { backgroundColor: colors.card }]}
                onChangeText={onMaxCapacityChange}
                outlineColor={colors.border}
                activeOutlineColor={colors.primary}
                textColor={colors.text}
                placeholderTextColor={colors.subText}
                 contentStyle={{
                    fontFamily: CUSTOM_FONT_FAMILY,
                    color: colors.text,
                }}
                renderToHardwareTextureAndroid={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    inputContainer: {
        marginBottom: 16,
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
        fontFamily: CUSTOM_FONT_FAMILY,
    },
    scrollViewContent: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    gameButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameButtonSelected: {
        borderColor: 'transparent',
        borderWidth: 2,
    },
    gameButtonText: {
        fontSize: TABLET_DEVICE ? 16 : 12,
        fontFamily: CUSTOM_FONT_FAMILY,
    },
    gameButtonTextSelected: {
    },
});

export default GameSelector;