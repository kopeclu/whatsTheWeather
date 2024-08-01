// Convert unix time to human readable

import axios from "axios";

export function convertTime(unixTime, timezone, format) {
  let humanTime;
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

// Get URL of given icon

export function getUrl(givenIcon) {
  return `https://openweathermap.org/img/wn/${givenIcon}@2x.png`;
}

export function replaceSpaces(word) {
  return word.replace(' ', '-');
}

export async function getTested(city) {

  const keyAPI = process.env.REACT_APP_KEY;

  const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${keyAPI}`;

  const result = await axios.get(locationURL);
  console.log('result:', result);
  const lon = result.data[0].lon;
  const lat = result.data[0].lat;

  console.log('returning lon:', lon);
  return {lon, lat};
}