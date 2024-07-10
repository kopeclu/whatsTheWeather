import { convertTime, getUrl } from "./functions";

const Element24Hours = ({data, timezone}) => {
  /**
   * temp, rain atd zmenit za male ikonky
   */

  return (
    <div className="element24">
      <h5>
        {convertTime(data.dt, timezone, 'hours')}
      </h5>
      <img src={getUrl(data.weather[0].icon)} alt="icon" />
      <h5>
        {data.weather[0].main}
      </h5>
      <h5>
        Temperature: {data.main.temp}°C
      </h5>
      <h5>
        Rain: {data.rain === undefined ? 0 : data.rain['3h']} mm
      </h5>
      <h5>
        Wind: {data.wind.speed} m/s
      </h5>
    </div>
  );
}
 
export default Element24Hours;