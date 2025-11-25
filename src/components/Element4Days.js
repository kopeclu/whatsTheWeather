import { convertTime, getUrl } from "../utils/helpers";
import WeatherStat from "./WeatherStat";

const Element4Days = ({data, timezone, metric}) => {
  const statsToDisplay = ["temp", "rain", "wind"]

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
            {statsToDisplay.map((stat, index) => (
              <WeatherStat
                key={index}
                type={stat}
                data={el}
                windMetric={metric}
                current={false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
 
export default Element4Days;