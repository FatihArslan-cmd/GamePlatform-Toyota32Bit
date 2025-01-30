import { useState, useEffect } from 'react';

const useLevelCalculation = (totalXp) => {
    const [level, setLevel] = useState(1);
    const [xpForNextLevel, setXpForNextLevel] = useState(1000);
    const [xpProgress, setXpProgress] = useState(0);


    useEffect(() => {
        const calculateLevel = () => {
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
        }


        calculateLevel();
    }, [totalXp])


    return { level, xpForNextLevel, xpProgress };
};

export default useLevelCalculation;