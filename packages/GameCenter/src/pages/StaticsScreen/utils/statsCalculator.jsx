export const calculateStats = (data) => {
    if (!data || data.length === 0) {
        return {
            totalDays: 0,
            totalTime: 0,
            averageTime: 0,
            longestSession: 0
        };
    }

    const totalDays = data.length;
    const totalTime = data.reduce((sum, item) => sum + item.duration, 0);
    const averageTime = Math.round(totalTime / totalDays);
    const longestSession = Math.max(...data.map(item => item.duration));

    return {
        totalDays,
        totalTime,
        averageTime,
        longestSession
    };
};

export const getWeeklyStats = (data) => {
    const lastWeek = data.slice(-7);
    return calculateStats(lastWeek);
};

export const getMonthlyStats = (data) => {
    const lastMonth = data.slice(-30);
    return calculateStats(lastMonth);
};

export const getPlayingStreak = (data) => {
    let streak = 0;
    const sortedData = [...data].sort((a, b) => b.date.localeCompare(a.date));
    
    for (let i = 0; i < sortedData.length; i++) {
        if (sortedData[i].duration > 0) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
};