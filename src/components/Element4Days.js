import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertTime, convertToKnots, getUrl } from "../utils/helpers";
import { faCloudRain, faTemperatureHigh, faWind } from "@fortawesome/free-solid-svg-icons";

const Element4Days = ({data, timezone, metric}) => {
  return (
    <div className="element4">
      {data.map((el, index) => (
        <div key={index} className="element4-content">

          <div className="element-hours">
            {convertTime(el.dt, timezone, 'hours')}
          </div>
          <img src={getUrl(el.weather[0].icon)} alt="weatherIcon" />
          <div className="element-main">
            {el.weather[0].main}
          </div>

          <div className="element-info">

            <div>
              <FontAwesomeIcon icon={faTemperatureHigh} className="icon" />  {el.main.temp} °C
            </div>
            <div>
              <FontAwesomeIcon icon={faCloudRain} className="icon" />  {el.rain === undefined ? 0 : el.rain['3h']} mm
            </div>
            <div>
              <FontAwesomeIcon icon={faWind} className="icon" /> {`${metric === 'm/s' ? el.wind.speed : convertToKnots(el.wind.speed)} ${metric}`}
            </div>

          </div>

        </div>
      ))}
    
    </div>
  );
}
 
export default Element4Days;