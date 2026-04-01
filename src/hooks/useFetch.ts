import { useEffect, useState } from "react";
import axios from 'axios';
import { CurrentWeather, ForecastData } from "../types";
import { getCurrentWeatherUrl, getForecastUrl } from "../constants";

const useFetch = (lon: string | undefined, lat: string | undefined) => {

  const [futureData, setFutureData] = useState<ForecastData | null>(null);
  const [currentData, setCurrentData] = useState<CurrentWeather | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!lon || !lat) return;

    const fetchWeatherData = async () => {
      setIsError(false);
      setIsPending(true)

      const apiKey = import.meta.env.VITE_APP_KEY;

      try {
        const [currentRes, futureRes] = await Promise.all([
          axios.get(getCurrentWeatherUrl(lat, lon, apiKey)),
          axios.get(getForecastUrl(lat, lon, apiKey))])

        setCurrentData(currentRes.data);
        setFutureData(futureRes.data);
      } catch (error) {
        console.log("Error while fetching data:", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchWeatherData();
  }, [lon, lat])

  return {currentData, futureData, isPending, isError};
}
 
export default useFetch;