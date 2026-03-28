import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudRain, faTemperatureHigh, faWind } from "@fortawesome/free-solid-svg-icons";
import { convertToKnots } from "../utils/helpers";

const WeatherStat = ({type, data, windMetric, current}) => {
  if (!data) return null;

  let icon, value, unit;

  switch (type) {
    case "temp":
      icon = faTemperatureHigh;
      value = data.main.temp;
      unit = "°C";
      break;

    case "rain":
      icon = faCloudRain;
      value = (current ? data.rain?.['1h'] : data.rain?.['3h']) || 0; 
      unit = "mm";
      break;

    case "wind":
      icon = faWind;
      value = windMetric === 'm/s' ? data.wind.speed : convertToKnots(data.wind.speed);
      unit = windMetric;
      break;

    case "clouds":
      icon = faCloud;
      value = data.clouds.all;
      unit = "%";
      break;

    default:
      return null;
  }
  
  return (
    <div>
      <FontAwesomeIcon icon={icon} className="icon" />
      {value} {unit}
    </div>
  );
}
 
export default WeatherStat;