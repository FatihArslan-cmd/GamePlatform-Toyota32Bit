import React, { createContext, useState, useCallback, useEffect, useContext, useMemo } from 'react';
import { getAchievements, getOwnedAchievements } from '../services/service';
import { useButtons } from '../../context/ButtonsContext';

const AchievementsContext = createContext();

export const AchievementsContextProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [allAchievements, setAllAchievements] = useState([]);
    const [ownedAchievements, setOwnedAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { handleAchievementCountChange } = useButtons();
    const [level, setLevel] = useState(1);
    const [xpForNextLevel, setXpForNextLevel] = useState(1000);
    const [xpProgress, setXpProgress] = useState(0);


    const calculateLevel = useCallback((totalXp) => {
        let currentLevel = 1;
        let xpNeeded = 1000;
        let currentXp = totalXp;

        while(currentXp >= xpNeeded){
            currentLevel++;
            currentXp -= xpNeeded;
            xpNeeded += 500;
        }

        setLevel(currentLevel);
        setXpForNextLevel(xpNeeded);
        setXpProgress(currentXp);
    }, []);


    const totalXp = useMemo(() => {
        return ownedAchievements.reduce((sum, achievement) => sum + parseInt(achievement.xp), 0);
    }, [ownedAchievements]);

    useEffect(() => {
        calculateLevel(totalXp);
    }, [totalXp, calculateLevel]);


    const fetchAchievements = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [allAchievementsData, ownedAchievementsData] = await Promise.all([
                getAchievements(),
                getOwnedAchievements(),
            ]);

            const enhancedAllAchievements = allAchievementsData.map(achievement => ({
                ...achievement,
                isOwned: ownedAchievementsData.some(owned => owned.id === achievement.id)
            }));

            setAllAchievements(enhancedAllAchievements);
            setOwnedAchievements(ownedAchievementsData);
            const ownedCount = ownedAchievementsData.length;
            handleAchievementCountChange(ownedCount);
        } catch (err) {
            console.error("Error fetching achievements:", err);
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }, [handleAchievementCountChange, calculateLevel]); 

    useEffect(() => {
        fetchAchievements();
    }, [fetchAchievements]);

    const achievementsContextValue = {
        activeTab,
        setActiveTab,
        allAchievements,
        ownedAchievements,
        loading,
        error,
        fetchAchievements,
        level,
        xpForNextLevel,
        xpProgress,
    };

    return (
        <AchievementsContext.Provider value={achievementsContextValue}>
            {children}
        </AchievementsContext.Provider>
    );
};

export const useAchievements = () => {
    return useContext(AchievementsContext);
};