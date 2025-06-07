import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";

import {
    Card,
    Title,
    Paragraph,
    Button,
    Avatar,
    Divider
} from "react-native-paper";

const TABLET_DEVICE = isTablet();

const EmptyState = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const { t } = useTranslation();

    const handleStartGame = () => {
        navigation.navigate('Tabs');
    };

    const handleRefresh = () => {
        console.log(t('StaticsScreen.refresh'));
    };

    return (
        <View style={styles.container}>
            <Card
                style={[
                    styles.card,
                    { backgroundColor: colors.card }
                ]}
            >
                <Card.Content style={styles.cardContent}>
                    <Avatar.Icon
                        size={TABLET_DEVICE ? 80 : 54}
                        icon="chart-line"
                        style={[
                            styles.mainIcon,
                            { backgroundColor: colors.primary + '20' }
                        ]}
                        color={colors.primary}
                    />

                    <Title style={[
                        styles.title,
                        { color: colors.text }
                    ]}>
                        {t('StaticsScreen.noGameData')}
                    </Title>

                    <Paragraph style={[
                        styles.description,
                        { color: colors.text + 'CC' }
                    ]}>
                        {t('StaticsScreen.noGameDataDescription')}
                    </Paragraph>

                    <Divider style={[
                        styles.divider,
                        { backgroundColor: colors.border + '50' }
                    ]} />

                    <Card
                        style={[
                            styles.tipCard,
                            { backgroundColor: colors.primary + '20' }
                        ]}

                    >
                        <Card.Content style={styles.tipContent}>
                            <Avatar.Icon
                                size={32}
                                icon="lightbulb-outline"
                                style={styles.tipIcon}
                                color={colors.primary}
                            />
                            <Paragraph style={[
                                styles.tipText,
                                { color: colors.text }
                            ]}>
                                {t('StaticsScreen.playYourFirstGame')}
                            </Paragraph>
                        </Card.Content>
                    </Card>

                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            onPress={handleStartGame}
                            icon="play"
                            style={styles.primaryButton}
                            contentStyle={styles.buttonContent}
                            buttonColor={colors.primary}
                        >
                            {t('StaticsScreen.startPlayingBingo')}
                        </Button>

                        <Button
                            mode="outlined"
                            onPress={handleRefresh}
                            icon="refresh"
                            style={styles.secondaryButton}
                            contentStyle={styles.buttonContent}
                            textColor={colors.primary}
                            outlineColor={colors.primary}
                        >
                            {t('StaticsScreen.refresh')}
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: TABLET_DEVICE ? 20 : 10,
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        width: TABLET_DEVICE ? '100%' : '80%',
        maxWidth: 500,
    },
    cardContent: {
        padding: 24,
        alignItems: 'center',
    },
    mainIcon: {
        marginBottom: 24,
    },
    title: {
        textAlign: 'center',
        marginBottom: 12,
        fontSize: TABLET_DEVICE ? 24 : 20,  
        fontFamily: 'Orbitron-ExtraBold',
    },
    description: {
        textAlign: 'center',
        marginBottom: 24,
        fontSize: TABLET_DEVICE ? 16 : 14,
        lineHeight: 24,
        paddingHorizontal: 16,
        fontFamily: 'Orbitron-ExtraBold',
    },
    divider: {
        width: '60%',
        marginBottom: 24,
        height: 1,
    },
    tipCard: {
        width: '100%',
        borderRadius: 12,
        marginBottom: 24,
        elevation: 1,
    },
     tipContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    tipIcon: {
        backgroundColor: 'transparent',
        marginRight: 12,
    },
    tipText: {
        flex: 1,
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: 14,
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        borderRadius: 8,
    },
    secondaryButton: {
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: 8,
    },
});

export default EmptyState;