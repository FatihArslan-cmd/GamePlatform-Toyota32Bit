import React, { createContext, useState, useRef, useContext, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ButtonsContext = createContext();

export const ButtonsContextProvider = ({ children }) => {
    const pagerRef = useRef(null);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [friendCount, setFriendCount] = useState(0);
    const [achievementCount, setAchievementCount] = useState(0);
    const { t } = useTranslation();
    const [tabs, setTabs] = useState([
        { id: 0, title: '0', subtitle: t('profileScreen.achievements') },
        { id: 1, title: friendCount.toString(), subtitle: t('profileScreen.friends') },
    ]);


    const handleTabPress = (index) => {
        setActiveTabIndex(index);
        pagerRef.current.setPage(index);
    };

    const handlePageChange = (event) => {
        const newIndex = event.nativeEvent.position;
        setActiveTabIndex(newIndex);
    };

    const handleAchievementCountChange = useCallback((count) => {
        setAchievementCount(count);
    }, []);

    const handleFriendCountChange = useCallback((count) => {
        setFriendCount(count);
    }, []);

    useEffect(() => {
        setTabs([
            { id: 0, title: achievementCount.toString(), subtitle: t('profileScreen.achievements') },
            { id: 1, title: friendCount.toString(), subtitle: t('profileScreen.friends') },
        ]);
    }, [achievementCount, friendCount, t]); 


    const buttonsContextValue = {
        pagerRef,
        activeTabIndex,
        setActiveTabIndex,
        friendCount,
        setFriendCount,
        achievementCount,
        setAchievementCount,
        tabs,
        setTabs,
        handleTabPress,
        handlePageChange,
        handleAchievementCountChange,
        handleFriendCountChange,
    };

    return (
        <ButtonsContext.Provider value={buttonsContextValue}>
            {children}
        </ButtonsContext.Provider>
    );
};

export const useButtons = () => {
    return useContext(ButtonsContext);
};