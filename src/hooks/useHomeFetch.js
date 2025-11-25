import axios from "axios";
import { useEffect, useState } from "react";

const useHomeFetch = (city) => {
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [currentData, setCurrentData] = useState();
  const keyAPI = process.env.REACT_APP_KEY;

  const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${keyAPI}`;

  useEffect(() => {
    axios.get(locationURL)
    .then((result) => {
      setLon(result.data[0].lon);
      setLat(result.data[0].lat);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [locationURL]);

  const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric`;

  useEffect(() => {
    if (!lon){
      return;
    }
    axios.get(currentURL)
    .then((result) => {
      setCurrentData(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [currentURL]);

  return {currentData};
}
 
export default useHomeFetch;