import axios from 'axios';
import { storage } from './storage';
// Create MMKV storage instance

export const fetchAndStoreGames = async () => {
    try {
        // Check if 'games' exists in local storage
        if (storage.contains('games')) {
           
            return null;
        }

        console.log('Fetching games data from API');
        // Send GET request to the API
        const response = await axios.get('https://rawg.io/api/games?token&key=3617c23566704a0590d99135fcd3491f');
        
        if (response.status === 200) {
            const data = response.data;

            // Save the data as a JSON string
            storage.set('games', JSON.stringify(data));

            return data; // Return the fetched data
        } else {
            console.error('API request failed with status:', response.status);
            return null; // Handle failure case
        }
    } catch (error) {
        console.error('Error occurred during API request:', error.toJSON());
        return null; // Handle error case
    }
};

export const getGamesFromStorage = () => {
    const data = storage.getString('games');

    return data ? JSON.parse(data) : [];
};


export const clearGamesFromStorage = () => {
    if (storage.contains('games')) {
        storage.delete('games');
        console.log('Games successfully cleared from storage.');
    } else {
        console.log('No games found in storage to clear.');
    }
};
