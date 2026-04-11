import { getIconUrl, STATS_TO_DISPLAY } from "../constants/index.ts";
import { ForecastItem, WindMetricType } from "../types/index.ts";
import { convertTime } from "../utils/helpers.ts";
import WeatherStat from "./WeatherStat.tsx";

type ForecastBoxProps = {
  data: ForecastItem,
  timezone: number,
  metric: WindMetricType
}

const ForecastBox = ({data, timezone, metric}: ForecastBoxProps) => {
  const iconURL = getIconUrl(data.weather[0].icon);
  const timestampHours = convertTime(data.dt, timezone, 'hours');
  const weatherStatus = data.weather[0].main;

  return (
    <div className="min-w-75 h-full flex flex-col items-center bg-white/50 backdrop-blur-md shadow-md rounded-3xl p-5 border border-white/60 hover:bg-white/60 transition-colors">
      
      <h5 className="text-xl font-bold text-gray-800 mb-3">
        {timestampHours}
      </h5>
      
      <div className="w-20 h-20 flex items-center justify-center bg-linear-to-br from-blue-100/50 to-white/50 rounded-full shadow-inner border border-white/60 mb-2">
        <img src={iconURL} alt={weatherStatus} className="w-16 object-contain drop-shadow-sm" />
      </div>
      
      <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
        {weatherStatus}
      </h5>
      
      <div className="grid grid-cols-2 gap-2 w-full grow">
        {STATS_TO_DISPLAY.map((el) => (
          <WeatherStat
            key={el}
            type={el}
            data={data}
            windMetric={metric}
            current={false}
          />
        ))}
      </div>
    </div>
  );
}
 
export default ForecastBox;