import AchievementCard from "./components/AchievementCard";
import EmptyState from "../../../../components/EmptyState";
import ErrorComponents from "../../../../components/ErrorComponents";
import LevelProgressBar from "./components/LevelProgressBar";
import OwnedAchievementCard from "./components/OwnedAchievementCard";
import React, { useCallback, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";
import { useAchievements } from "./context/AchievementsContext";

const TABLET_DEVICE = isTablet();

const AchievementsPage = () => {
    const { activeTab, setActiveTab, allAchievements, ownedAchievements, loading, error } = useAchievements();
    const { colors } = useTheme(); 
    const { t } = useTranslation();

    const renderItem = useCallback(({ item }) => {
        if (activeTab === 'all') {
            return <AchievementCard item={item} colors={colors} />; 
        } else {
            return <OwnedAchievementCard item={item} colors={colors} />; 
        }
    }, [activeTab, colors]);

    const filteredData = useMemo(() => {
        if (activeTab === 'all') {
            return allAchievements;
        } else {
            return ownedAchievements;
        }
    }, [activeTab, allAchievements, ownedAchievements]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}> 
            <SegmentedButtons
                value={activeTab}
                onValueChange={setActiveTab}
                buttons={[
                    {
                        value: 'all',
                        label:  t('profileScreen.allAchievements'),
                        labelStyle: [styles.buttonLabel, { color: colors.text }], 
                        style: { backgroundColor: colors.card } 
                    },
                    {
                        value: 'owned',
                        label: t('profileScreen.yourAchievements'),
                        labelStyle: [styles.buttonLabel, { color: colors.text }], 
                        style: { backgroundColor: colors.card } 
                    },
                ]}
                style={[styles.segmentedButtons, { backgroundColor: colors.buttonBackground }]} 
                theme={{ colors: { primary: colors.primary, surface: colors.card, text: colors.text } }} 
            />
            {activeTab === 'owned' && (
                <LevelProgressBar colors={colors} /> 
            )}
            {loading ? (
                <></>
            ) : error ? (
                <ErrorComponents message={error} />
            ) : (
                <FlashList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    estimatedItemSize={15}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => <EmptyState textColor={colors.text} message="No achievements yet!"/>} 
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    segmentedButtons: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 16,
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    buttonLabel: {
        fontFamily: 'Orbitron-ExtraBold',
        fontSize: TABLET_DEVICE ? 14 : 10,
    }
});

export default AchievementsPage;