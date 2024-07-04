const Forecast = ({city, data, current}) => {
  console.log(data);
  const unixTimestamp = data.map((el) => (el.dt));

  // Create a new JavaScript Date object based on the timestamp multiplied by 1000
  // because the Date constructor accepts milliseconds.
  unixTimestamp.forEach((time) => {

    const date = new Date(time * 1000);
    
    // Get the components of the date
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // months are zero-indexed
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    
    // Format the date and time as desired
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    console.log(formattedDate);
  })
    

  return (
    <div className="forecast">
      <h1>
        {current.data.name}
      </h1>
      <h1>
        Current:
      </h1>
      <h3>
        Temp: {current.data.main.temp}°C, Wind: {current.data.wind.speed}m/s, 
      </h3>
      <h1>
        Forecast:
      </h1>
      <h3>
        Weather: {data[10].weather[0].main}, Temp: {data[10].main.temp}°C, Clouds: {data[10].clouds.all}%
      </h3>
    </div>
  );
}
 
export default Forecast;