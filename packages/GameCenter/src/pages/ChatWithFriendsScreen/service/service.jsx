import { getToken } from '../states/api';
import api from '../../../shared/states/api';

export const fetchFriendsFromService = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const response = await api.get(`/friends/friends`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const message = `Failed to fetch friends. Status code: ${response.status}`;
      console.error(message);
      throw new Error(message);
    }
    const data = await response.json();
    return data.friends;
  } catch (error) {
    console.error('Error fetching friends in service:', error);
    throw error; // Re-throw the error to be handled in the component
  }
};

