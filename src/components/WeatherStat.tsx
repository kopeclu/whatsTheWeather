import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudRain, faTemperatureHigh, faWind } from "@fortawesome/free-solid-svg-icons";
import { convertToKnots } from "../utils/helpers.ts";
import { CurrentWeather, ForecastItem, WindMetricType } from "../types";
import { WIND_METRIC } from "../constants/index.ts";

type WeatherStatProps = {
  type: string,
  data: CurrentWeather | ForecastItem,
  windMetric: WindMetricType,
  current: boolean
}

const WeatherStat = ({type, data, windMetric, current}: WeatherStatProps) => {
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
      value = windMetric === WIND_METRIC.METERS ? data.wind.speed : convertToKnots(data.wind.speed);
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
    <div className="h-full flex flex-col items-center justify-center p-3 sm:p-4 ">
      
      <FontAwesomeIcon icon={icon} className="text-xl sm:text-2xl mb-2 drop-shadow-sm" />
      
      <div className="text-lg sm:text-xl font-bold text-gray-800 flex items-baseline gap-1 whitespace-nowrap">
        {value} <span className="text-sm sm:text-base font-semibold text-gray-600">{unit}</span>
      </div>
      
    </div>
  );
}
 
export default WeatherStat;