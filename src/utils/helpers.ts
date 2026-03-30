import axios from "axios";

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
  const convesionCONST = 1.94384449;
  const knotSpeed = meterSpeed * convesionCONST;
  return knotSpeed.toFixed(2);
}

// Get coordinates of given city

export async function getCoords(city: string) {

  const keyAPI = import.meta.env.VITE_APP_KEY;
  const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${keyAPI}`;

  const result = await axios.get(locationURL);
  
  const lon = result.data[0].lon;
  const lat = result.data[0].lat;

  return {lon, lat};
}