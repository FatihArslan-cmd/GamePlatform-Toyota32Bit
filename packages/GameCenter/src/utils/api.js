import axios from "axios";
import { storage } from "./storage";

export const fetchAndStoreGames = async () => {
    try {
        if (storage.contains('games')) {
            return null;
        }
        const response = await axios.get('https://rawg.io/api/games?token&key=3617c23566704a0590d99135fcd3491f');
        
        if (response.status === 200) {
            const data = response.data;

            storage.set('games', JSON.stringify(data));

            return data;
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Error occurred during API request:', error.toJSON());
        return null;
    }
};

export const getGamesFromStorage = () => {
    const data = storage.getString('games');

    return data ? JSON.parse(data) : [];
};


export const clearGamesFromStorage = () => {
    if (storage.contains('games')) {
        storage.delete('games');
    } else {
    }
};
export const deleteIfExists = (key) => {
    if (storage.contains(key)) { 
      storage.delete(key); 
    }
  };