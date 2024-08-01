import axios from "axios";
import { useEffect, useState } from "react";

const useGetCoords = (city) => {
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
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

  return {lon, lat};
}
 
export default useGetCoords;