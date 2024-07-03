import './App.css';
import Header from './Header';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState();
  const keyAPI = process.env.REACT_APP_KEY;

  const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${keyAPI}`;
  console.log(locationURL);
  const lat = '';
  const lon = '';

  const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${keyAPI}`

  return (
    <div className="App">
      <Header city={city} setCity={setCity}/>
      <h1>
        This is weather App
      </h1>
    </div>
  );
}

export default App;
