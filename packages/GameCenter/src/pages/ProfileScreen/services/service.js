import api from '../../../shared/states/api';
import { getToken } from '../../../shared/states/api';


const getAuthHeader = async () => {
    const token = await getToken();
    return { Authorization: `Bearer ${token}` };
};

export const generateFriendCode = async () => {
    try {
        const headers = await getAuthHeader();
        const response = await api.post(`/friends/generate-friend-code`, {}, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to generate code.');
    }
};

export const fetchFriends = async () => {
    try {
        const headers = await getAuthHeader();
        const response = await api.get(`/friends`, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch friends');
    }
};

export const removeFriend = async (friendId) => {
    try {
        const headers = await getAuthHeader();
        const response = await api.delete(`/remove-friend/${friendId}`, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to remove friend.');
    }
};

export const addFriend = async (friendCode) => {
    try {
        const headers = await getAuthHeader();
        const response = await api.post(`/add-friend`, { friendCode }, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add friend.');
    }
};