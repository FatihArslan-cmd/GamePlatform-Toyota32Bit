import React from 'react';
import Animated from 'react-native-reanimated';
import AchievementCardBase from './AchievementCardBase';
import useCardAnimation from '../hooks/useCardAnimation';

const AchievementCard = ({ item, index }) => {
    const { animatedStyle } = useCardAnimation(index);

    return (
        <Animated.View style={animatedStyle}>
            <AchievementCardBase item={item} />
        </Animated.View>
    );
};

export default AchievementCard;