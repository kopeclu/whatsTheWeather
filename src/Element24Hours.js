import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertTime, getUrl } from "./functions";
import { faCloudRain, faTemperatureHigh, faWind } from "@fortawesome/free-solid-svg-icons";

const Element24Hours = ({data, timezone}) => {
  /**
   * temp, rain atd zmenit za male ikonky
   */

  return (
    <div className="element24">

      <h5 className="element-hours">
        {convertTime(data.dt, timezone, 'hours')}
      </h5>
      <img src={getUrl(data.weather[0].icon)} alt="icon" />
      <h5 className="element-main">
        {data.weather[0].main}
      </h5>

      <div className="element-info">
        <div>
          <FontAwesomeIcon icon={faTemperatureHigh} className="icon" />  {data.main.temp}°C
        </div>
        <div>
          <FontAwesomeIcon icon={faCloudRain} className="icon" />  {data.rain === undefined ? 0 : data.rain['3h']} mm
        </div>
        <div>
          <FontAwesomeIcon icon={faWind} className="icon" />  {data.wind.speed} m/s
        </div>
      </div>

    </div>
  );
}
 
export default Element24Hours;