import { convertTime, getUrl } from "../utils/helpers";
import WeatherStat from "./WeatherStat";

const Element24Hours = ({data, timezone, metric}) => {
  const statsToDisplay = ["temp", "rain", "wind"]

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
        {statsToDisplay.map((el, index) => (
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
 
export default Element24Hours;