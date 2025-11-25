import ForecastCurrent from './ForecastCurrent';
import Forecast24Hours from './Forecast24Hours';
import Forecast4Days from './Forecast4Days';
import useFetch from './useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';

const Forecast = () => {

  const navigate = useNavigate();

  const {lon, lat} = useParams();

  const [trigger, setTrigger] = useState(false);
  const [ metric, setMetric ] = useState('m/s');

  useEffect(() => {
    if (lon !== undefined && lat !== undefined) {
      setTrigger(true);
    }
  }, [lon, lat])

  // eslint-disable-next-line
  const {currentData, futureData, isPending, isError} = useFetch(trigger ? lon : null, trigger ? lat : null);
  
  if (isError){
    navigate('/404');
  }

  if (!currentData){
    return <h2 className="loading">Loading...</h2>
  }


  return (
    <>
      <Header />
      <div className="set-metrics">
        <p>Wind speed: </p>
        <form id="metric-form">
          <input type="radio" id="ms" value="ms" name="metric" checked={metric === 'm/s'} onChange={() => setMetric('m/s')} />
          <label htmlFor="ms">m/s</label>
          <input type="radio" id="kt" value="kt" name="metric" checked={metric === 'kt'} onChange={() => setMetric('kt')} />
          <label htmlFor="kt">kt</label>
        </form>
      </div>
      {currentData && futureData &&
        <div className="forecast">

          <div className="forecast-city-name">
            {currentData.data.name}
          </div>
          <ForecastCurrent currentData={currentData} metric={metric} />

          <div className="forecast-header">
            Next 24 hours:
          </div>
          <Forecast24Hours futureData={futureData} metric={metric} />

          <div className="forecast-header">
            Next 4 days:
          </div>
          <Forecast4Days futureData={futureData} timePresent={currentData.data.dt} timezone={currentData.data.timezone} metric={metric} />
        </div>
      }
    </>
  );
}
 
export default Forecast;