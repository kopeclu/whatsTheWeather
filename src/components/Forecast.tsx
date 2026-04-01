import ForecastCurrent from './ForecastCurrent.tsx';
import Forecast24Hours from './Forecast24Hours.tsx';
import Forecast4Days from './Forecast4Days.tsx';
import useFetch from '../hooks/useFetch.ts';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header.tsx';
import { useEffect, useState } from 'react';
import { WindMetricType } from '../types/index.ts';
import { WIND_METRIC } from '../constants/index.ts';

const Forecast = () => {
  const navigate = useNavigate();
  const {lon, lat} = useParams<string>();
  const [ metric, setMetric ] = useState<WindMetricType>(WIND_METRIC.METERS);

  const {currentData, futureData, isPending, isError} = useFetch(lon, lat);
  
  useEffect(() => {
    if (isError)
      navigate('/404');
  }, [isError, navigate])
    
  if (!currentData || !futureData || isPending){
    return <h2 className="loading">Loading...</h2>
  }

  return (
    <>
      <Header />
      <div className="set-metrics">
        <p>Wind speed: </p>
        <form id="metric-form">
          <input
            type="radio"
            id="ms"
            value="ms"
            name="metric"
            checked={metric === WIND_METRIC.METERS}
            onChange={() => setMetric(WIND_METRIC.METERS)}
          />
          <label htmlFor="ms">m/s</label>
          <input
            type="radio"
            id="kt"
            value="kt"
            name="metric"
            checked={metric === WIND_METRIC.KNOTS}
            onChange={() => setMetric(WIND_METRIC.KNOTS)}
          />
          <label htmlFor="kt">kt</label>
        </form>
      </div>
      {currentData && futureData &&
        <div className="forecast">
          <div className="forecast-city-name">
            {currentData.name}
          </div>
          <ForecastCurrent
            currentData={currentData}
            metric={metric}
          />

          <div className="forecast-header">
            Next 24 hours:
          </div>
          <Forecast24Hours
            futureData={futureData}
            metric={metric}
          />

          <div className="forecast-header">
            Next 4 days:
          </div>
          <Forecast4Days
            futureData={futureData}
            timePresent={currentData.dt}
            timezone={currentData.timezone}
            metric={metric}
          />
        </div>
      }
    </>
  );
}
 
export default Forecast;