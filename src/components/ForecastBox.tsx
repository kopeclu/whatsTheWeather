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
    <div className="min-w-75 h-full flex flex-col items-center bg-white/50 shadow-md rounded-3xl p-5 gap-7">
      
      <h5 className="text-xl font-bold text-gray-800">
        {timestampHours}
      </h5>
      
      <div className="w-20 h-20 flex flex-col items-center justify-center">
        <img src={iconURL} alt={weatherStatus} className="w-16 object-contain" />
        <h3 className="text-lg font-semibold text-gray-700 -mt-2">
          {weatherStatus}
        </h3>
      </div>
      
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