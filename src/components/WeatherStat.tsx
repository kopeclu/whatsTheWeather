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

  let icon, value, unit, label;

  switch (type) {
    case "temp":
      icon = faTemperatureHigh;
      value = data.main.temp;
      unit = "°C";
      label = "Temperature";
      break;

    case "rain":
      icon = faCloudRain;
      value = (current ? data.rain?.['1h'] : data.rain?.['3h']) || 0; 
      unit = "mm";
      label = "Rain";
      break;

    case "wind":
      icon = faWind;
      value = windMetric === WIND_METRIC.METERS ? data.wind.speed : convertToKnots(data.wind.speed);
      unit = windMetric;
      label = "Wind";
      break;

    case "clouds":
      icon = faCloud;
      value = data.clouds.all;
      unit = "%";
      label = "Clouds"
      break;

    default:
      return null;
  }
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-3 sm:p-4 bg-white/40 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 hover:bg-white/60 transition-colors">
      
      <FontAwesomeIcon icon={icon} className="text-xl sm:text-2xl md:text-3xl mb-2 drop-shadow-sm" />
      
      <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 truncate w-full text-center">
        {label}
      </span>
      
      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 flex items-baseline gap-1 whitespace-nowrap">
        {value} <span className="text-sm sm:text-base font-semibold text-gray-600">{unit}</span>
      </div>
      
    </div>
  );
}
 
export default WeatherStat;