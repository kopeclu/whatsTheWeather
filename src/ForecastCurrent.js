import useGetUrl from "./useGetUrl";

const ForecastCurrent = ({currentData}) => {
  return (
    <div className="forecast-current">
      <img src={useGetUrl(currentData.data.weather[0].description)} alt="weather icon" />
      <h3>
        Temp: {currentData.data.main.temp}°C, Wind: {currentData.data.wind.speed}m/s, 
      </h3>
    </div>
  );
}
 
export default ForecastCurrent;