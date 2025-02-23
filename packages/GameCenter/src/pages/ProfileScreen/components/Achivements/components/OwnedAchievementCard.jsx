import React from 'react';
import AchievementCardBase from './AchievementCardBase';

const OwnedAchievementCard = ({ item }) => {
    return <AchievementCardBase item={item} isOwned={true} />;
};

export default OwnedAchievementCard;