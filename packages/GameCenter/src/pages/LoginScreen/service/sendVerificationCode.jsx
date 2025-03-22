import api from "../../../shared/states/api";

const sendVerificationCode = async (username) => {
  try {
    const response = await api.post('/send-verification-code', { username });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response; 
    } else if (error.request) {
      throw new Error("Network Error: No response from server");
    } else {
      throw new Error("API Request Setup Error: " + error.message);
    }
  }
};

export { sendVerificationCode }; 