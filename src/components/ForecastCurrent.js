import { convertTime, getUrl } from "../utils/helpers";
import WeatherStat from "./WeatherStat";

const ForecastCurrent = ({currentData, metric}) => {
  const statsToDisplay = ["temp", "rain", "wind", "clouds"]

  return (
    <div className="forecast-current">
      <input id="ch" type="checkbox" />
      <div className="cimg">
        <img src={getUrl(currentData.data.weather[0].icon)} alt="weather icon" />
        <h2>{currentData.data.weather[0].main}</h2>
      </div>
      <div className="cweather-all-info">
        {statsToDisplay.map((el, index) => (
          <WeatherStat
            key={index}
            type={el}
            data={currentData.data}
            windMetric={metric}
            current={true}
          />
        ))}
      </div>
      <label id="see-more" htmlFor="ch" >See more</label>
      <div className="cweather-see-more">
        <div className="cweather-all-info">
          <div>
            <span>Pressure: </span>{currentData.data.main.pressure} hPa
          </div>
          <div>
            <span>Humidity: </span>{currentData.data.main.humidity} %
          </div>
          <div>
            <span>Sunrise: </span>{convertTime(currentData.data.sys.sunrise, currentData.data.timezone, 'hours')}
          </div>
          <div>
            <span>Sunset: </span>{convertTime(currentData.data.sys.sunset, currentData.data.timezone, 'hours')}
          </div>
          <div>
            <span>Visibility: </span>{(Number(currentData.data.visibility)/1000).toFixed(1)} km
          </div>
        </div>
        <label id="see-less" htmlFor="ch" >See less</label>
      </div>
    </div>
  );
}
 
export default ForecastCurrent;