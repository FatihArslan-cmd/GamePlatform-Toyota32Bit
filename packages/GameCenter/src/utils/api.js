import axios from 'axios';
import { storage } from './storage';
// Create MMKV storage instance

export const fetchAndStoreGames = async () => {
    try {
        // Send GET request to the API
        const response = await axios.get('https://gamerpower.com/api/giveaways');
        
        if (response.status === 200) {
            const data = response.data;

            // Save the data as a JSON string
            storage.set('games', JSON.stringify(data));

            console.log('Data successfully saved:', data);
        } else {
            console.error('API request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error occurred during API request:', error.toJSON());
    }
};

// Function to retrieve data from MMKV storage
export const getGamesFromStorage = () => {
    const data = storage.getString('games'); // Ensure the key is 'games' as stored by fetchAndStoreGames
    return data ? JSON.parse(data) : [];
  };
