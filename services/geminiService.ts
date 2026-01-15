import { GoogleGenAI, Type } from "@google/genai";
import { VocabularyResponse } from '../types';

// Initialize Gemini
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWordForChar = async (char: string): Promise<VocabularyResponse> => {
  const prompt = `
    Generate a simple, common Japanese word that starts with the character "${char}".
    If the character is 'ん' (n) or 'を' (wo), you can choose a word that contains it or is relevant to it.
    Provide the word in Kanji (if applicable) or Kana, its reading (Hiragana), English meaning, and a very short example sentence.
  `;

  const schema = {
    type: Type.OBJECT,
    properties: {
      word: { type: Type.STRING, description: "The Japanese word" },
      reading: { type: Type.STRING, description: "Reading in Hiragana" },
      meaning: { type: Type.STRING, description: "English meaning" },
      example: { type: Type.STRING, description: "A short example sentence" },
    },
    required: ["word", "reading", "meaning", "example"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    
    return JSON.parse(text) as VocabularyResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};