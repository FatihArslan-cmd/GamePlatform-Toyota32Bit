import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

import {
    Card,
    Title,
    List,
    Avatar,
    Badge,
    Button,
    Divider,
    Text
} from "react-native-paper";



const DataList = ({ data }) => {
    const { colors } = useTheme();
    const [showAll, setShowAll] = useState(false);
    const displayData = showAll ? data : data.slice(0, 8);
    const { t } = useTranslation();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
            });
        }
    };

    const getDurationInfo = (duration) => {
        if (duration >= 60) return {
            color: '#F44336',
            icon: 'fire',
            level: 'Intense',
            backgroundColor: '#F44336'
        };
        if (duration >= 30) return {
            color: '#FF9800',
            icon: 'lightning-bolt',
            level: 'Active',
            backgroundColor: '#FF9800'
        };
        if (duration >= 10) return {
            color: '#4CAF50',
            icon: 'star',
            level: 'Good',
            backgroundColor: '#4CAF50'
        };
        return {
            color: '#9E9E9E',
            icon: 'circle-small',
            level: 'Light',
            backgroundColor: '#9E9E9E'
        };
    };

    return (
        <Card style={[styles.container, { backgroundColor: colors.card }]} elevation={3}>
            <Card.Content>
                <View style={styles.header}>
                    <Title style={[styles.title, { color: colors.text }]}>{t('StaticsScreen.dailyDetails')}</Title>
                    <Badge
                        style={[
                            styles.totalBadge,
                            { backgroundColor: colors.primary }
                        ]}
                        size={24}
                    >
                        {data.length}
                    </Badge>
                </View>

                <View style={styles.listContainer}>
                    {displayData.map((item, index) => {
                        const durationInfo = getDurationInfo(item.duration);

                        return (
                            <View key={item.date}>
                                <List.Item
                                    title={formatDate(item.date)}
                                    description={item.date}
                                    left={(props) => (
                                        <Avatar.Icon
                                            {...props}
                                            icon={durationInfo.icon}
                                            size={44}
                                            style={[
                                                styles.listAvatar,
                                                { backgroundColor: durationInfo.backgroundColor + '20' }
                                            ]}
                                            color={durationInfo.color}
                                        />
                                    )}
                                    right={() => (
                                        <View style={styles.rightContent}>
                                            <Text style={[
                                                styles.durationText,
                                                { color: durationInfo.color }
                                            ]}>
                                                {item.duration} {t('StaticsScreen.min')}
                                            </Text>

                                        </View>
                                    )}
                                    titleStyle={[
                                        styles.listTitle,
                                        { color: colors.text }
                                    ]}
                                    descriptionStyle={[
                                        styles.listDescription,
                                        { color: colors.text + 'AA' }
                                    ]}
                                    style={styles.listItem}
                                />
                                {index < displayData.length - 1 && (
                                    <Divider style={styles.divider} />
                                )}
                            </View>
                        );
                    })}
                </View>

                {data.length > 8 && (
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="outlined"
                            onPress={() => setShowAll(!showAll)}
                            icon={showAll ? "chevron-up" : "chevron-down"}
                            style={styles.toggleButton}
                            contentStyle={styles.buttonContent}
                            textColor={colors.primary}
                            outlineColor={colors.primary}
                        >
                            {showAll
                                ? "Show Less" 
                                : `Show ${data.length - 8} More` 
                            }
                        </Button>
                    </View>
                )}
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 16,
        borderRadius: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
              fontFamily: 'Orbitron-ExtraBold',

    },
    totalBadge: {
        minWidth: 32,
        height: 24,
    },
    listContainer: {
        marginBottom: 8,
    },
    listItem: {
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    listAvatar: {
        marginRight: 8,
    },
    rightContent: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 8,
    },
    durationText: {
        fontSize: 18,
      fontFamily: 'Orbitron-ExtraBold',
        marginBottom: 4,
    },
    levelBadge: {
        paddingHorizontal: 8,
        minWidth: 50,
    },
    levelBadgeText: {
        fontSize: 10,
      fontFamily: 'Orbitron-ExtraBold',
    },
    listTitle: {
      fontFamily: 'Orbitron-ExtraBold',
        fontSize: 16,
    },
    listDescription: {
        fontSize: 12,
        marginTop: 2,
    },
    divider: {
        marginLeft: 60,
        marginRight: 16,
    },
    buttonContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    toggleButton: {
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: 4,
    },
});

export default DataList;