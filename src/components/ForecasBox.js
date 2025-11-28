import { convertTime, getUrl } from "../utils/helpers";
import WeatherStat from "./WeatherStat";

const ForecasBox = ({data, timezone, metric}) => {
  const statsToDisplay = ["temp", "rain", "wind"]

  return (
    <div className="forecast-box">
      <h5 className="forecast-box-hours">
        {convertTime(data.dt, timezone, 'hours')}
      </h5>
      <img src={getUrl(data.weather[0].icon)} alt="icon" />
      <h5 className="forecast-box-status">
        {data.weather[0].main}
      </h5>
      <div className="forecast-box-info">
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
 
export default ForecasBox;