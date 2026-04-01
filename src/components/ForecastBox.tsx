import { getIconUrl, STATS_TO_DISPLAY } from "../constants/index.ts";
import { ForecastItem, WindMetricType } from "../types/index.ts";
import { convertTime } from "../utils/helpers.ts";
import WeatherStat from "./WeatherStat.tsx";

type ForecasBoxProps = {
  data: ForecastItem,
  timezone: number,
  metric: WindMetricType
}

const ForecasBox = ({data, timezone, metric}: ForecasBoxProps) => {
  const iconURL = getIconUrl(data.weather[0].icon);
  const timestampHours = convertTime(data.dt, timezone, 'hours');
  const weatherStatus = data.weather[0].main;

  return (
    <div className="forecast-box">
      <h5 className="forecast-box-hours">
        {timestampHours}
      </h5>
      <img src={iconURL} alt="icon" />
      <h5 className="forecast-box-status">
        {weatherStatus}
      </h5>
      <div className="forecast-box-info">
        {STATS_TO_DISPLAY.map((el, index) => (
          <WeatherStat
            key={index}
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
 
export default ForecasBox;