import { convertTime } from "./functions";

const Element4Days = ({data, day, timezone}) => {
  return (
    <div className="element4">
      <div className="element4-header">
        {day}
      </div>
      <div className="element4-content">
        {data.map((el) => (
          <div>
            <h3>
              {convertTime(el.dt, timezone, 'hours')}
            </h3>
            <h3>
              temp: {el.main.temp}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default Element4Days;