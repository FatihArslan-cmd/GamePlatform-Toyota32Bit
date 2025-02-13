import api from "../../../shared/states/api";
import { getToken } from "../../../shared/states/api"; // Assuming getToken is exported from api.js

export const getMessagesFromApi = async () => {
  try {
    const token = await getToken(); 
    const response = await api.get('/postmessages', { 
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Axios automatically parses JSON response
  } catch (error) {
    // Handle errors - you can log them or re-throw a more user-friendly error
    console.error("Error fetching messages:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`Failed to fetch messages: ${error.response.status} - ${error.response.data.message || 'Server error'}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("Failed to fetch messages: No response from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Failed to fetch messages: ${error.message}`);
    }
  }
};