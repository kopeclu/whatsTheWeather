import ForecastCurrent from './ForecastCurrent';
import Forecast24Hours from './Forecast24Hours';
import Forecast4Days from './Forecast4Days';
import useFetch from './useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';

const Forecast = () => {

  const navigate = useNavigate();

  const {city} = useParams();

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (city) {
      setTrigger(true);
      console.log('setting true');
    }
  }, [city])

  // eslint-disable-next-line
  const {currentData, futureData, isPending, isError} = useFetch(trigger ? city : null);
  
  if (isError){
    navigate('/404');
  }

  if (!currentData){
    console.log('pending:', isPending);
    console.log('error:', isError);
    return <h2 className="loading">Loading...</h2>
  }


  return (
    <>
      <Header />
      {currentData && futureData &&
        <div className="forecast">

          <div className="forecast-city-name">
            {currentData.data.name}
          </div>
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
      }
    </>
  );
}
 
export default Forecast;