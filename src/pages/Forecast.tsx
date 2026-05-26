import ForecastCurrent from '../components/ForecastCurrent.tsx';
import Forecast24Hours from '../components/Forecast24Hours.tsx';
import Forecast4Days from '../components/Forecast4Days.tsx';
import useFetch from '../hooks/useFetch.ts';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from '../components/Header.tsx';
import { useEffect, useState } from 'react';
import { WindMetricType } from '../types/index.ts';
import { WIND_METRIC } from '../constants/index.ts';
import UnitToggle from '../components/UnitToggle.tsx';
import { getCoords } from '../utils/helpers.ts';

const Forecast = () => {
  const navigate = useNavigate();
  const { city } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lon = searchParams.get('lon');
  const lat = searchParams.get('lat');
  const [ metric, setMetric ] = useState<WindMetricType>(WIND_METRIC.METERS);

  useEffect(() => {
    const initializeData = async () => {
      if (!city) return;

      if (!lon || !lat) {
        try {
          const coords = await getCoords(city);
          
          setSearchParams({
            lon: String(coords.lon),
            lat: String(coords.lat)
          });
        
          return; 
        } catch (err) {
          console.error("Failed to resolve city name from URL path", err);
          navigate('/404');
          return;
        }
      }
    }

    initializeData();
  }, [city, lon, lat, setSearchParams, navigate])

  const {currentData, futureData, isPending, isError} = useFetch(lon!, lat!);
  
  useEffect(() => {
    if (isError)
      navigate('/404');
  }, [isError, navigate])

  return (
    <div className="flex flex-col min-h-screen bg-[#DCF0FF]">
      <Header />
      <UnitToggle metric={metric} setMetric={setMetric} />
      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col items-center">

      {(isPending || !currentData || !futureData) ? (
        <div className="grow flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-black-600 animate-pulse">
            Loading Forecast...
          </h2>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-8 md:gap-12">
          <ForecastCurrent
            currentData={currentData}
            metric={metric}
          />

          <Forecast24Hours
            futureData={futureData}
            metric={metric}
          />

          <Forecast4Days
            futureData={futureData}
            timePresent={currentData.dt}
            timezone={currentData.timezone}
            metric={metric}
          />
        </div>
        )
      }
      </main>
    </div>
  );
}
 
export default Forecast;