import api from "../../../shared/states/api";

const sendVerificationCode = async (username) => {
  try {
    const response = await api.post('/send-verification-code', { username });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API Error Response Data:", error.response.data);
      console.error("API Error Response Status:", error.response.status);
      throw error.response; 
    } else if (error.request) {
      console.error("API Request Error:", error.request);
      throw new Error("Network Error: No response from server");
    } else {
      console.error("API Request Setup Error:", error.message);
      throw new Error("API Request Setup Error: " + error.message);
    }
  }
};

export { sendVerificationCode }; 