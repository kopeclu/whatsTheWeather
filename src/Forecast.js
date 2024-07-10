import ForecastCurrent from './ForecastCurrent';
import Forecast24Hours from './Forecast24Hours';
import Forecast4Days from './Forecast4Days';

const Forecast = ({futureData, currentData}) => {

  return (
    <div className="forecast">

      <div className="forecast-city-name">
        {currentData.data.name}
      </div>

      {/* <h1>Current:</h1> */}
      <ForecastCurrent currentData={currentData} />

      <div className="forecast-header">
        Next 24 hours:
      </div>
      <Forecast24Hours futureData={futureData} />

      <div className="forecast-header">
        Next 4 days:
      </div>
      <Forecast4Days futureData={futureData} timePresent={currentData.data.dt} timezone={currentData.data.timezone} />
        

    </div>
  );
}
 
export default Forecast;