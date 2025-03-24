import api from "../../../../../shared/states/api";
import { getToken } from "../../../../../shared/states/api";


export const createMessageApi = async (messageData) => {
  try {
    const token = await getToken();
    const response = await api.post('/postmessages', messageData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating message:", error);
    if (error.response) {
      throw new Error(`Failed to create message: ${error.response.status} - ${error.response.data.message || 'Server error'}`);
    } else if (error.request) {
      throw new Error("Failed to create message: No response from server");
    } else {
      throw new Error(`Failed to create message: ${error.message}`);
    }
  }
};