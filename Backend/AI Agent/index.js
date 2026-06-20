const { GoogleGenAI } = require('@google/genai');
const readlineSync = require('readline-sync');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

if (!GEMINI_API_KEY || !WEATHER_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY or WEATHER_API_KEY in environment variables.');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const ConversationHistory = [];


async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: ConversationHistory
  });

  return response.text;
}


async function getWeather(location) {
  if (!Array.isArray(location)) {
    throw new Error('location must be an array');
  }

  const weatherInfo = [];
  for (const { city, date } of location) {
    const safeCity = encodeURIComponent(city);
    const safeDate = String(date).toLowerCase();

    if (safeDate === 'today') {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${safeCity}`);
      if (!response.ok) {
        throw new Error(`Weather API request failed for ${city}: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      weatherInfo.push(data);
    }
    else {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${safeCity}&dt=${encodeURIComponent(date)}`);
      if (!response.ok) {
        throw new Error(`Weather API request failed for ${city} (${date}): ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      weatherInfo.push(data);
    }
  }

  return weatherInfo;
}



async function chatting() {

  const question = readlineSync.question('How I can Help You--> ');
  const prompt = `
You are an AI agent, who will respond to me in JSON format only.
Analyse the user query and try to fetch city and date details from it.
Date format should be in (yyyy-mm-dd) if user ask for future weather.
If user ask for today weather, mark date as 'today'.
To fetch weather details, I already have some function which can fetch the weather details for me,

if you need weather information, use the below format
JSON format should look like below:
{
  "weather_details_needed": true,
  "location": [{"city":"mumbai", "date":"today"},{"city":"delhi", "date":"2025-04-30"}]
}

As an LLM; You don't know currrent date: Mark Today date is 2026-06-02

Once you have the weather report details, respond me in JSON format only.
If I have provided you weather details of delhi and you have enough information about them, make the summary of weather report and return it to me like below.
JSON format should look like below:
{
  "weather_details_needed": false,
  "weather_report":"Bhai Delhi ka mausam toh badiya hai, 18 degree temperatur hai, ghar pe pakode bana lo, maja aayega khaane mein",
}




User asked this question: ${question}

Strictly follow JSON format, respond only in JSON format.


`

  ConversationHistory.push({
    role: "user",
    parts: [{ text: prompt }]
  });

  while (true) {
    const responseText = await main();
    ConversationHistory.push({ role: 'model', parts: [{ text: responseText }] });

    const cleanedResponse = responseText
      .trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    let data;
    try {
      data = JSON.parse(cleanedResponse);
    } catch (error) {
      throw new Error(`Model did not return valid JSON: ${cleanedResponse}`);
    }

    if (data.weather_details_needed === false) {
      console.log(data.weather_report);
      break;
    }

    const weatherInformation = await getWeather(data.location);
    const weatherInfo = JSON.stringify(weatherInformation);
    ConversationHistory.push({
      role: 'user',
      parts: [{ text: `This is the weather report I have fetched for you. Use this weather report to generate the final user response: ${weatherInfo}` }]
    });
  }

}


chatting();




// 
// {
//   "weather_details_needed": true,
//   "location": [{"city":"delhi", "date":"today"}, {"city":"mumbai", "date":"today"}]
// }
// 





// Delhi and mumbai ka mausam bata

// LLM ko Bolunga: Delhi and mumbai ka mausam bata, return mein muje location wala array de dena

// [{city:"delhi", date:'today'}, {city:"mumbai", date:'today'}];

//  Location getweather --> Actual weather laake de dega

// Actual weather aaya hai, LLM ko dunga, iska weather report card ready kar de

// User output mein show kara dunga

// first agent: Mausam ke baare mein btayega
// Blockchain chain
//  Github profile leke aa sakta hai
// News API

