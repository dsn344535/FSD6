import axios from "axios";

const API_KEY = "AIzaSyDWgf5abM8_LrPLNppHD1b8gQ2BLomq-jY";

export const askGemini = async (prompt) => {
  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt }
            ]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {

    console.log("Gemini API error:", error.response?.data || error.message);

    return "Error getting response from Gemini.";
  }
};