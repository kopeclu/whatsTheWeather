import useConvertTime from "./useConvertTime";
import useGetUrl from "./useGetUrl";

const ForecastFuture = ({data, timezone}) => {

  return (
    <div className="forecast-future">
      <h2>
        Time: {useConvertTime(data.dt, timezone, true)}
      </h2>
      <img src={useGetUrl(data.weather[0].icon)} alt="weather icon" />
      <h3>
        Weather: {data.weather[0].main}, Temp: {data.main.temp}°C, Clouds: {data.clouds.all}%
      </h3>
    </div>
  );
}
 
export default ForecastFuture;