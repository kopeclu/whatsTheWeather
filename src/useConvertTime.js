// Convert unix time to human readable

const useConvertTime = (unixTime, timezone, withDay) => {
  let humanTime;
  const date = new Date((unixTime+timezone) * 1000);
    
  // Get the components of the date
  const month = date.getUTCMonth() + 1; // months are zero-indexed
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  
  // Format the date and time as desired
  if (withDay){
    humanTime = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  } else {
    humanTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  return humanTime;
}
 
export default useConvertTime;