import { convertTime, convertToKnots, getUrl } from "./functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudRain, faTemperatureHigh, faWind } from "@fortawesome/free-solid-svg-icons";

const ForecastCurrent = ({currentData, metric}) => {

  return (
    <div className="forecast-current">
      <input id="ch" type="checkbox" />

      <div className="cimg">
        <img src={getUrl(currentData.data.weather[0].icon)} alt="weather icon" />
        <h2>{currentData.data.weather[0].main}</h2>
      </div>

      <div className="cweather-all-info">

        <div>
          <FontAwesomeIcon icon={faTemperatureHigh} className="icon" />{currentData.data.main.temp}°C
        </div>
        <div>
          <FontAwesomeIcon icon={faCloudRain} className="icon" /> {currentData.data.rain === undefined ? 0 : currentData.data.rain['1h']} mm
        </div>
        <div>
          <FontAwesomeIcon icon={faWind} className="icon" /> {`${metric === 'm/s' ? currentData.data.wind.speed : convertToKnots(currentData.data.wind.speed)} ${metric}`}
        </div>
        <div>
          <FontAwesomeIcon icon={faCloud} className="icon" /> {currentData.data.clouds.all} %
        </div>

      </div>
      <label id="see-more" htmlFor="ch" >See more</label>

      <div className="cweather-see-more">
        <div className="cweather-all-info">
          <div>
            <span>Pressure: </span><i className="cweather-all-nowrap">{currentData.data.main.pressure} hPa</i>
          </div>
          <div>
            <span>Humidity: </span><i className="cweather-all-nowrap">{currentData.data.main.humidity} %</i>
          </div>
          <div>
            <span>Sunrise: </span>{convertTime(currentData.data.sys.sunrise, currentData.data.timezone, 'hours')}
          </div>
          <div>
            <span>Sunset: </span>{convertTime(currentData.data.sys.sunset, currentData.data.timezone, 'hours')}
          </div>
          <div>
            <span>Visibility: </span><i className="cweather-all-nowrap">{(Number(currentData.data.visibility)/1000).toFixed(1)} km</i>
          </div>
        </div>
        <label id="see-less" htmlFor="ch" >See less</label>
      </div>

    </div>
  );
}
 
export default ForecastCurrent;