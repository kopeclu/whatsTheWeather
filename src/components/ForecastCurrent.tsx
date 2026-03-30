import { getIconUrl, STATS_TO_DISPLAY } from "../constants/index.ts";
import { CurrentWeather, WindMetricType } from "../types/index.ts";
import { convertTime } from "../utils/helpers.ts";
import WeatherStat from "./WeatherStat.tsx";

type ForecastCurrentProps = {
  currentData: CurrentWeather,
  metric: WindMetricType
}

const ForecastCurrent = ({currentData, metric}: ForecastCurrentProps) => {
  return (
    <div className="forecast-current">
      <input id="ch" type="checkbox" />
      <div className="cimg">
        <img src={getIconUrl(currentData.weather[0].icon)} alt="weather icon" />
        <h2>{currentData.weather[0].main}</h2>
      </div>
      <div className="cweather-all-info">
        {STATS_TO_DISPLAY.map((el, index) => (
          <WeatherStat
            key={index}
            type={el}
            data={currentData}
            windMetric={metric}
            current={true}
          />
        ))}
      </div>
      <label id="see-more" htmlFor="ch" >See more</label>
      <div className="cweather-see-more">
        <div className="cweather-all-info">
          <div>
            <span>Pressure: </span>{currentData.main.pressure} hPa
          </div>
          <div>
            <span>Humidity: </span>{currentData.main.humidity} %
          </div>
          <div>
            <span>Sunrise: </span>{convertTime(currentData.sys.sunrise, currentData.timezone, 'hours')}
          </div>
          <div>
            <span>Sunset: </span>{convertTime(currentData.sys.sunset, currentData.timezone, 'hours')}
          </div>
          <div>
            <span>Visibility: </span>{(Number(currentData.visibility)/1000).toFixed(1)} km
          </div>
        </div>
        <label id="see-less" htmlFor="ch" >See less</label>
      </div>
    </div>
  );
}
 
export default ForecastCurrent;