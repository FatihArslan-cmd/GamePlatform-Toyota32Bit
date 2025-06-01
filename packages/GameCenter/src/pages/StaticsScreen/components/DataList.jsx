import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";

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

const TABLET_DEVICE = isTablet();

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

    const getAvatarSize = () => TABLET_DEVICE ? 44 : 36;
    const getAvatarMarginRight = () => TABLET_DEVICE ? 8 : 6;
    const getDividerMarginLeft = () => (TABLET_DEVICE ? 4 : 4) + getAvatarSize() + getAvatarMarginRight();


    return (
        <Card style={[styles.container, { backgroundColor: colors.card }]} elevation={1}                         onPress={() => {}}
         onPress={() => {}}
     >
            <Card.Content>
                <View style={styles.header}>
                    <Title style={[styles.title, { color: colors.text }]}>{t('StaticsScreen.dailyDetails')}</Title>
                    <Badge
                        style={[
                            styles.totalBadge,
                            { backgroundColor: colors.primary }
                        ]}
                        size={TABLET_DEVICE ? 24 : 20}
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
                                            size={getAvatarSize()}
                                            style={[
                                                styles.listAvatar,
                                                {
                                                    backgroundColor: durationInfo.backgroundColor + '20',
                                                    marginRight: getAvatarMarginRight()
                                                }
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
                                    <Divider style={[
                                        styles.divider,
                                        { marginLeft: getDividerMarginLeft() }
                                    ]} />
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
        margin: TABLET_DEVICE ? 16 : 12,
        borderRadius: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: TABLET_DEVICE ? 16 : 12,
    },
    title: {
        fontSize: TABLET_DEVICE ? 20 : 18,
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
        paddingVertical: TABLET_DEVICE ? 8 : 6,
        paddingHorizontal: TABLET_DEVICE ? 4 : 2,
    },
    listAvatar: {

    },
    rightContent: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: TABLET_DEVICE ? 8 : 4,
    },
    durationText: {
        fontSize: TABLET_DEVICE ? 18 : 16,
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
        fontSize: TABLET_DEVICE ? 16 : 14,
    },
    listDescription: {
        fontSize: TABLET_DEVICE ? 12 : 10,
        marginTop: 2,
    },
    divider: {

        marginRight: TABLET_DEVICE ? 16 : 12,
        height: 1,
    },
    buttonContainer: {
        marginTop: TABLET_DEVICE ? 16 : 12,
        alignItems: 'center',
    },
    toggleButton: {
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: TABLET_DEVICE ? 4 : 2,
    },
});

export default DataList;