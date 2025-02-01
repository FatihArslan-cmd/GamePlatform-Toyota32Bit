import React from 'react';
import AchievementCardBase from './AchievementCardBase';
import useLevelCalculation from '../hooks/useLevelCalculation';
import LevelProgressBar from './LevelProgressBar';

const OwnedAchievementCard = ({ item }) => {
    const { level, xpForNextLevel, xpProgress } = useLevelCalculation(parseInt(item.xp));

    return (
        <>
            <LevelProgressBar
                level={level}
                currentXP={xpProgress}
                nextLevelXP={xpForNextLevel}
            />
            <AchievementCardBase item={item} isOwned={true} />
        </>
    );
};

export default OwnedAchievementCard;