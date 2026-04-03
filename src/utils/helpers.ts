import axios from "axios";
import { ForecastItem } from "../types";

// Convert unix time to human readable

export function convertTime(unixTime: number, timezone: number, format: string): string {
  let humanTime = "";
  const date = new Date((unixTime+timezone) * 1000);
    
  // Get the components of the date
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // months are zero-indexed
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  
  // Format the date and time as desired
  if (format === 'full'){
    humanTime = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  } else if (format === 'hours') {
    humanTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  } else if (format === 'day') {
    humanTime = `${String(day).padStart(2, '0')}`;
  } else if (format === 'date') {
    humanTime = `${String(year).padStart(2, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  return humanTime;
}

export function replaceSpaces(word: string) {
  return word.replace(' ', '-');
}

export function convertToKnots(meterSpeed: number) {
  const conversionCONST = 1.94384449;
  const knotSpeed = meterSpeed * conversionCONST;
  return knotSpeed.toFixed(2);
}

// Get coordinates of given city

export async function getCoords(city: string) {

  const keyAPI = import.meta.env.VITE_APP_KEY;
  const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${keyAPI}`;

  try {
    const result = await axios.get(locationURL);
    const lon = result.data[0].lon;
    const lat = result.data[0].lat;
  
    return {lon, lat};
  } catch (error) {
    throw new Error("Getting coordinates has failed.")
  }
  
}

const chunkArray = (array: Array<ForecastItem>, chunkSize: number) => {
  let result = Array<Array<ForecastItem>>();
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

// Returns names of next 4 days with forecast for these days
export const getFourDaysData = (fullData: Array<ForecastItem>, timezone: number, timePresent: number) => {
  const todayString = convertTime(timePresent, timezone, 'day');
  const futureDataFlat = fullData.filter((item) => {
    return convertTime(item.dt, timezone, 'day') !== todayString;
  });

  // Get next 4 days, each day has 8 chunks (each chunk has 3 hours - by default)
  const daysData = chunkArray(futureDataFlat, 8).slice(0, 4);

  const dayNames = daysData.map((dayChunk) => {
    const dateString = convertTime(dayChunk[0].dt, timezone, 'date');
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  });

  return {daysData, dayNames};
}