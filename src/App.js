import axios from 'axios';
import './App.css';
import './Card.css';
import './Header.css';
import './Forecast.css';
import Header from './Header';
import { useEffect, useState } from 'react';
import Card from './Card';
import Forecast from './Forecast';

function App() {
  const [city, setCity] = useState();
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [futureData, setFutureData] = useState();
  const [currentData, setCurrentData] = useState();
  const keyAPI = process.env.REACT_APP_KEY;

  const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${keyAPI}`;
  // console.log(locationURL);

  useEffect(() => {

    axios.get(locationURL)
    .then((result) => {
      // console.log(result.data[0]);
      setLon(result.data[0].lon);
      setLat(result.data[0].lat);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [locationURL])

  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric`;

  useEffect(() => {
    axios.get(weatherURL)
    .then((result) => {
      console.log(result);
      setFutureData(result.data.list);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [weatherURL])

  const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric`;

  useEffect(() => {
    axios.get(currentURL)
    .then((result) => {
      console.log(result);
      setCurrentData(result);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [currentURL])

  return (
    <div className="App">
      <Header city={city} setCity={setCity}/>
      { futureData && currentData && 
        <Forecast futureData={futureData} currentData={currentData} />
        }
      <Card />
    </div>
  );
}

export default App;
