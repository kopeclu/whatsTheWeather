// Convert unix time to human readable

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

export function convertToKnots(meterSpeed) {
  const convesionCONST = 1.94384449;
  const knotSpeed = meterSpeed * convesionCONST;
  return knotSpeed.toFixed(2);
}