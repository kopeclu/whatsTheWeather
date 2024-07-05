import icons from './WeatherCodes.json';

const useGetUrl = (givenIcon) => {

  // Get icon id from json file
  const getIconId = (iconName) => {
    const found = icons.find((icon) => iconName.toLowerCase()===icon.weather.toLowerCase())
    return found.code;
  }

  // Display icon for night or day
  const getDayOrNight = () => {
    const date = new Date();

    const hours = date.getHours();
    return hours > 6 && hours < 22 ? 'd' : 'n'; 
  }
  
  return `https://openweathermap.org/img/wn/${getIconId(givenIcon)}${getDayOrNight()}@2x.png`;
}
 
export default useGetUrl;