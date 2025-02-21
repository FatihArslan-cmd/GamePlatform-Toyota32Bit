import api from "../../../shared/states/api";

const sendVerificationCode = async (username) => {
  try {
    const response = await api.post('/send-verification-code', { username });
    return response.data; // Or just return the whole response if you need status codes etc.
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error Response Data:", error.response.data);
      console.error("API Error Response Status:", error.response.status);
      throw error.response; // Re-throw the response error for the component to handle
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Request Error:", error.request);
      throw new Error("Network Error: No response from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Request Setup Error:", error.message);
      throw new Error("API Request Setup Error: " + error.message);
    }
  }
};

export { sendVerificationCode }; // Export the new function along with any existing exports