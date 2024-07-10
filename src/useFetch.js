import { useEffect, useRef, useState } from "react";
import axios from 'axios';

const useFetch = (city) => {

  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [futureData, setFutureData] = useState();
  const [currentData, setCurrentData] = useState();
  const [isPending, setisPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const isInitialRender = useRef(true)
  const keyAPI = process.env.REACT_APP_KEY;

  const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${keyAPI}`;

  useEffect(() => {
    if (isInitialRender.current) {
      setIsError(false);
      setisPending(false);
      return;
    }

    axios.get(locationURL)
    .then((result) => {
      setLon(result.data[0].lon);
      setLat(result.data[0].lat);
      setIsError(false);
      setisPending(false);
    })
    .catch((err) => {
      setIsError(true);
      setisPending(false);
      console.log(err);
    })
  }, [locationURL])

  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric`;

  useEffect(() => {
    if (isInitialRender.current) {
      setIsError(false);
      setisPending(false);
      return;
    }

    axios.get(weatherURL)
    .then((result) => {
      console.log(result);
      setFutureData(result.data);
      setIsError(false);
      setisPending(false);
    })
    .catch((err) => {
      console.log(err);
      setIsError(true);
      setisPending(false);
    })
  }, [weatherURL])

  const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric`;

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      setIsError(false);
      setisPending(false);
      return;
    }

    axios.get(currentURL)
    .then((result) => {
      console.log(result);
      setCurrentData(result);
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