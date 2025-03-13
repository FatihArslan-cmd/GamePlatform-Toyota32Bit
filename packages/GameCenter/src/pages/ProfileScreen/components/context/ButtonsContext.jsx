import React, { createContext, useState, useRef, useContext, useCallback, useEffect } from 'react';

const ButtonsContext = createContext();

export const ButtonsContextProvider = ({ children }) => {
    const pagerRef = useRef(null);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [friendCount, setFriendCount] = useState(0);
    const [achievementCount, setAchievementCount] = useState(0);

    const [tabs, setTabs] = useState([
        { id: 0, title: '0', subtitle: 'Achievements' },
        { id: 1, title: friendCount.toString(), subtitle: 'Friends' }
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
        setTabs(prevTabs => {
            const newTabs = [...prevTabs];
            newTabs[0].title = achievementCount.toString();
            newTabs[1].title = friendCount.toString();
            return newTabs;
        });
    }, [achievementCount, friendCount]);


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