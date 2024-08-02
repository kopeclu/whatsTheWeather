import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertTime, convertToKnots, getUrl } from "./functions";
import { faCloudRain, faTemperatureHigh, faWind } from "@fortawesome/free-solid-svg-icons";

const Element24Hours = ({data, timezone, metric}) => {

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
          <FontAwesomeIcon icon={faWind} className="icon" />  {`${metric === 'm/s' ? data.wind.speed : convertToKnots(data.wind.speed)} ${metric}`}
        </div>
      </div>

    </div>
  );
}
 
export default Element24Hours;