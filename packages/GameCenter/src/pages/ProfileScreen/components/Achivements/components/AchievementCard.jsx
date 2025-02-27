import React from 'react';
import AchievementCardBase from './AchievementCardBase';

const AchievementCard = ({ item }) => {
    return <AchievementCardBase item={item} isOwned={item.isOwned} />;
};

export default AchievementCard;