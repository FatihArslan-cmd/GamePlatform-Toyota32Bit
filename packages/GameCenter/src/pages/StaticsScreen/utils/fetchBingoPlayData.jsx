import { storage } from "../../../utils/storage";
import { calculateStats } from "./statsCalculator";

const fetchBingoPlayData = async ({ setIsLoading, setBingoDailyData, setStats }) => {
    setIsLoading(true);
    try {
        const allKeys = storage.getAllKeys();
        const bingoPlayDurationKeys = allKeys.filter(key => key.startsWith('play_duration_bingo_'));

        const data = bingoPlayDurationKeys.map(key => {
            const dateString = key.replace('play_duration_bingo_', '');
            const duration = storage.getNumber(key) || 0;
            return { date: dateString, duration };
        });

        data.sort((a, b) => b.date.localeCompare(a.date));

        setBingoDailyData(data);
        setStats(calculateStats(data));
    } catch (error) {
        console.error("Failed to fetch bingo play duration data:", error);
    } finally {
        setIsLoading(false);
    }
};

export { fetchBingoPlayData };