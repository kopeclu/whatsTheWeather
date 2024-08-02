import { useEffect, useRef, useState } from "react";
import axios from 'axios';

const useFetch = (lon, lat) => {

  const [futureData, setFutureData] = useState();
  const [currentData, setCurrentData] = useState();
  const [isPending, setisPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const isInitialRender = useRef(true)
  const keyAPI = process.env.REACT_APP_KEY;

  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric`;

  useEffect(() => {
    if (isInitialRender.current) {
      setIsError(false);
      setisPending(false);
      return;
    }

    axios.get(weatherURL)
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