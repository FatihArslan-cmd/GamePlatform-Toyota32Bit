// chatService.js
import { getToken } from '../../../shared/states/api'; // Assuming this path is correct relative to chatService.js
import api from '../../../shared/states/api'; // Assuming this path is correct relative to chatService.js

export const fetchChatHistoryFromService = async (friendId) => {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error('Authentication token not found.');
        }
        const response = await api.get(`/chat/chat-history/${friendId}`, { // Updated endpoint path, verify your actual API endpoint
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Axios throws an error for non-2xx status codes.
        // If we reach here, it means the status code is in the 2xx range (including 200).
        return response.data.chatHistory; // Access chat history from response.data
    } catch (error) {
        console.error('Error fetching chat history in service:', error);
        // Handle specific error cases, e.g., network error, server error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with status:', error.response.status);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
        }
        throw error; // Re-throw the error to be handled in the component
    }
};