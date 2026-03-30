import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { CurrentWeather, ForecastData } from "../types";
import { getCurrentWeatherUrl, getForecastUrl } from "../constants";

const useFetch = (lon: string | undefined | null, lat: string | undefined | null) => {

  const [futureData, setFutureData] = useState<ForecastData | null>(null);
  const [currentData, setCurrentData] = useState<CurrentWeather | null>(null);
  const [isPending, setisPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const isInitialRender = useRef(true)
  const apiKey = import.meta.env.VITE_APP_KEY;

  const forecastURL = getForecastUrl(lat, lon, apiKey);

  useEffect(() => {
    if (isInitialRender.current) {
      setIsError(false);
      setisPending(false);
      return;
    }

    axios.get(forecastURL)
    .then((result) => {
      setFutureData(result.data);
      setIsError(false);
      setisPending(false);
    })
    .catch((err) => {
      console.log(err);
      setIsError(true);
      setisPending(false);
    })
  }, [forecastURL])

  const currentURL = getCurrentWeatherUrl(lat, lon, apiKey);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      setIsError(false);
      setisPending(false);
      return;
    }

    axios.get(currentURL)
    .then((result) => {
      setCurrentData(result.data);
      setIsError(false);
      setisPending(false);
    })
    .catch((err) => {
      console.log(err);
      setIsError(true);
      setisPending(false);
    })
  }, [currentURL])


  return {currentData, futureData, isPending, isError};
}
 
export default useFetch;