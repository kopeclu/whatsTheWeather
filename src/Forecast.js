import ForecastCurrent from './ForecastCurrent';
import ForecastFuture from './ForecastFuture';

const Forecast = ({futureData, currentData}) => {

  return (
    <div className="forecast">

      <h1>
        {currentData.data.name}
      </h1>

      <h1>Current:</h1>
      <ForecastCurrent currentData={currentData} />

      <h1>Forecast:</h1>
      { futureData.map((data, index) => (
        <ForecastFuture data={data} timezone={currentData.data.timezone} key={index} />
        ))}

    </div>
  );
}
 
export default Forecast;