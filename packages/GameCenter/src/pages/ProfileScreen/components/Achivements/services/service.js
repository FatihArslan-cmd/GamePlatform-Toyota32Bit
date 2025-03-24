import api from '../../../../../shared/states/api';
import { getToken } from '../../../../../shared/states/api';


const getAchievements = async () => {
  try {
    const token = await getToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const response = await api.get('/achievements', { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching all achievements:', error);
    throw error;
  }
};

const getOwnedAchievements = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return null; 
    }
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const response = await api.get(`/achievements/owned`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching owned achievements:', error);
    throw error;
  }
};

const addAchievement = async (achievementId) => {
  try {
    const token = await getToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const response = await api.post('/achievements', { achievementId }, { headers });
    return response.data;
  } catch (error) {
    console.error('Error adding achievement:', error);
    throw error;
  }
};

export { getAchievements, getOwnedAchievements, addAchievement };