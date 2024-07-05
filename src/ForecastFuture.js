import useGetUrl from "./useGetUrl";

const ForecastFuture = ({data}) => {

  // Convert unix time to human readable
  const getTime = (time) => {
    const date = new Date(time * 1000);
    
    // Get the components of the date
    const month = date.getMonth() + 1; // months are zero-indexed
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Format the date and time as desired
    const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    
    return formattedDate;
}

  return (
    <div className="forecast-future">
      <h2>
        Time: {getTime(data.dt)}
      </h2>
      <img src={useGetUrl(data.weather[0].description)} alt="weather icon" />
      <h3>
        Weather: {data.weather[0].main}, Temp: {data.main.temp}°C, Clouds: {data.clouds.all}%
      </h3>
    </div>
  );
}
 
export default ForecastFuture;