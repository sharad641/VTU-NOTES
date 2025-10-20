import axios from 'axios';

const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // replace with your key

export const getProjectIdeas = async (projectType, userMessage) => {
  const prompt = `Suggest 3 innovative and practical ${projectType} project ideas for computer science students. 
  Consider creativity, usefulness, and technical feasibility. 
  ${userMessage ? `User interest: ${userMessage}` : ''}`;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No ideas found.';
    return text.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return ['⚠️ Could not generate ideas. Try again later.'];
  }
};
