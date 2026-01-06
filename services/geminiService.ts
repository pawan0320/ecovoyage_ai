
import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary, TripSimulation, TicketAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export interface SentimentAnalysisResult {
  sentimentScore: number;
  positiveCount: number;
  negativeCount: number;
  keyThemes: { topic: string; sentiment: 'positive' | 'negative'; count: number }[];
  strategicRecommendation: string;
}

export const analyzeTicketContext = async (ticketText: string): Promise<TicketAnalysis> => {
  if (!apiKey) {
    // Mock response if no API key
    return {
      tier: 'MID',
      confidence: 85,
      reasoning: "Mock analysis: Standard class detected.",
      extractedClass: "Economy"
    };
  }

  const prompt = `Analyze this travel ticket/booking information and categorize the traveler's likely budget tier (LUXURY, MID, or BUDGET).
  
  Input Data: "${ticketText}"
  
  Rules:
  - First/Business Class or 5-star hotels -> LUXURY
  - Economy/Coach or Hostels -> BUDGET
  - Premium Economy or 3-4 star hotels -> MID
  
  Return JSON:
  {
    "tier": "LUXURY" | "MID" | "BUDGET",
    "confidence": number (0-100),
    "reasoning": "string",
    "extractedPrice": "string (optional)",
    "extractedClass": "string (optional)"
  }`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tier: { type: Type.STRING, enum: ['LUXURY', 'MID', 'BUDGET'] },
            confidence: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            extractedPrice: { type: Type.STRING },
            extractedClass: { type: Type.STRING },
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text) as TicketAnalysis;
  } catch (error) {
    console.error("Ticket analysis error:", error);
    return { tier: 'MID', confidence: 0, reasoning: 'Error analyzing ticket' };
  }
};

export const generateSmartItinerary = async (
  destination: string,
  days: number,
  budget: string,
  interests: string[]
): Promise<Itinerary | null> => {
  if (!apiKey) {
    console.error("API Key is missing");
    return null;
  }

  const prompt = `Create a detailed ${days}-day travel itinerary for ${destination} with a budget of ${budget}. 
  The user is interested in: ${interests.join(', ')}.
  
  Focus on "Smart Tourism" principles: eco-friendly transport, local authentic experiences, and avoiding peak crowds.
  
  Return ONLY valid JSON with this structure:
  {
    "destination": "String",
    "duration": Number,
    "totalCostEstimate": "String",
    "ecoScore": Number (1-10, where 10 is most eco-friendly),
    "days": [
      {
        "day": Number,
        "theme": "String (e.g., Historical Dive)",
        "activities": [
          {
            "time": "String (e.g., 10:00 AM)",
            "title": "String",
            "description": "String",
            "type": "sightseeing|food|adventure|relaxation",
            "carbonFootprint": "Low|Medium|High",
            "cost": "String"
          }
        ]
      }
    ]
  }`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            duration: { type: Type.NUMBER },
            totalCostEstimate: { type: Type.STRING },
            ecoScore: { type: Type.NUMBER },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  theme: { type: Type.STRING },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        type: { type: Type.STRING },
                        carbonFootprint: { type: Type.STRING },
                        cost: { type: Type.STRING },
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as Itinerary;
  } catch (error) {
    console.error("Gemini generation error:", error);
    return null;
  }
};

export const analyzeBusinessReviews = async (reviews: string[]): Promise<SentimentAnalysisResult | null> => {
  if (!apiKey) return null;

  const prompt = `Analyze the following customer reviews for a hospitality business. 
  Identify key themes, overall sentiment score (0-100), and provide a strategic recommendation.
  
  Reviews:
  ${reviews.map(r => `- ${r}`).join('\n')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentimentScore: { type: Type.NUMBER },
            positiveCount: { type: Type.NUMBER },
            negativeCount: { type: Type.NUMBER },
            keyThemes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  topic: { type: Type.STRING },
                  sentiment: { type: Type.STRING },
                  count: { type: Type.NUMBER },
                }
              }
            },
            strategicRecommendation: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as SentimentAnalysisResult;
  } catch (error) {
    console.error("Gemini sentiment analysis error:", error);
    return null;
  }
};

export const chatWithAI = async (message: string, context?: string) => {
  if (!apiKey) return "I'm sorry, I can't connect to the AI service right now.";

  const systemInstruction = `You are EcoVoyage AI, a smart tourism assistant. 
  Your goals:
  1. Provide eco-conscious travel tips.
  2. Act as a translator if asked (e.g., "How do I say X in Japanese").
  3. Recommend local, authentic experiences over tourist traps.
  4. Be concise and helpful.
  5. Use the provided context to tailor your answers (e.g. if user is on Booking screen, offer help with payments).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context || 'General travel help'}\nUser: ${message}`,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text || "I didn't catch that. Could you try again?";
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm having trouble connecting to the network.";
  }
};

export const simulateTripExperience = async (
  destinationName: string,
  amenities: string[],
  userPrefs: string
): Promise<TripSimulation | null> => {
  if (!apiKey) {
    // Fallback Mock Data for demo purposes if no API key
    return {
      matchScore: 94,
      vibeTag: "Mindful Adventurer",
      timeline: [
        { 
          timeOfDay: 'Morning', 
          narrative: 'You wake up to the gentle sound of the jungle. Sunlight filters through the bamboo blinds. The air is fresh and free of city smog.', 
          sensoryDetail: 'Scent of rain and fresh lemongrass.',
          impactHighlight: 'Solar-powered shower saved 0.5kg CO2.'
        },
        { 
          timeOfDay: 'Afternoon', 
          narrative: 'You explore the local rice terraces with a guide from the nearby village. Lunch is a vibrant salad picked from the garden hours ago.', 
          sensoryDetail: 'Taste of ripe, sun-warmed mango.',
          impactHighlight: 'Zero food miles = 0 emissions.'
        },
        { 
          timeOfDay: 'Evening', 
          narrative: 'As dusk falls, the resort lights up with soft, warm LEDs. You enjoy a quiet tea ceremony listening to the crickets.', 
          sensoryDetail: 'Sound of distant temple bells.',
          impactHighlight: 'Supported local artisan community.'
        }
      ],
      projectedSavings: {
        co2: "14.5 kg",
        water: "320 L",
        plastic: "12 bottles"
      }
    };
  }

  const prompt = `Simulate a realistic "Day in the Life" for a traveler staying at ${destinationName}.
  The resort has these amenities: ${amenities.join(', ')}.
  The user describes themselves as: ${userPrefs}.

  Create a 3-part narrative (Morning, Afternoon, Evening) that focuses on the SENSORY experience and the SUSTAINABILITY impact of their stay.
  
  Return JSON:
  {
    "matchScore": Number (0-100 based on compatibility),
    "vibeTag": "String (e.g. Eco-Luxury Nomad)",
    "timeline": [
      {
        "timeOfDay": "Morning|Afternoon|Evening",
        "narrative": "String (2-3 sentences)",
        "sensoryDetail": "String (sight/sound/smell/taste)",
        "impactHighlight": "String (specific eco benefit)"
      }
    ],
    "projectedSavings": {
      "co2": "String (e.g. 12kg)",
      "water": "String",
      "plastic": "String"
    }
  }`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchScore: { type: Type.NUMBER },
            vibeTag: { type: Type.STRING },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timeOfDay: { type: Type.STRING },
                  narrative: { type: Type.STRING },
                  sensoryDetail: { type: Type.STRING },
                  impactHighlight: { type: Type.STRING },
                }
              }
            },
            projectedSavings: {
              type: Type.OBJECT,
              properties: {
                co2: { type: Type.STRING },
                water: { type: Type.STRING },
                plastic: { type: Type.STRING },
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as TripSimulation;
  } catch (error) {
    console.error("Simulation error:", error);
    return null;
  }
};

export const generateTripMemory = async (
  destination: string,
  activities: string[],
  mood: string
): Promise<string> => {
  if (!apiKey) return "AI Memory generation requires an API Key. Please configure it.";

  const prompt = `Write a short, nostalgic, and beautiful travel diary entry (max 100 words) for a trip to ${destination}.
  The traveler participated in: ${activities.join(', ')}.
  The overall mood of the trip was: ${mood}.
  Focus on the sensory details and the feeling of being sustainable/eco-friendly.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Could not generate memory.";
  } catch (error) {
    console.error("Memory generation error:", error);
    return "Error creating memory.";
  }
};
