// import { Link } from "react-router-dom";
// import Card from "./Card";
import Header from "./Header"
// import { replaceSpaces } from "./functions";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
// import { useEffect } from "react";
// import L from 'leaflet';
import Legend from "./Legend";

const Home = () => {
  // const europeCities = ['London', 'Barcelona', 'Paris', 'Madrid', 'Berlin', 'Prague', 'Rome', 'Zagreb', 'Wien', 'Split'];

  // const americaCities = ['New York', 'Los Angeles', 'Washington DC', 'Las Vegas', 'San Francisco', 'Ottawa', 'Rio de Janeiro'];

  // const asiaCities = ['Tokyo', 'Beijing', 'Hong Kong', 'New Dilli'];

  // Start of Leaflet

  const { BaseLayer, Overlay } = LayersControl;
  const baseMapUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  const keyAPI = process.env.REACT_APP_KEY;

  

  // End of Leaflet

  // const getRandomInt = (range) => {
  //   return Math.floor(Math.random() * range);
  // }

  // const chosenCities = [europeCities[getRandomInt(europeCities.length)],americaCities[getRandomInt(americaCities.length)], asiaCities[getRandomInt(asiaCities.length)]];

  return (
    <>
      <Header />
      <div className="welcome-message">
        <p>
          <span>Welcome to MyWeatherApp!</span>
          <br/><br/>
          Our app is designed to provide you with the most accurate and up-to-date weather information. However, there are a few things you should be aware of:
          <br/><br/>
          <span>Nearest Location Search:</span> Our search algorithm is optimized to find the nearest available location with weather data. If you search for a small or less-known city, the app may display weather information for the closest place where data is available.
          <br/><br/>
          <span>Search Limits:</span> This app uses a free version of API calls, which means there is a limit to the number of searches you can make per minute. If your search doesn't load, it's likely that the limit has been exceeded. Please wait a moment and try again.
        </p>
      </div>

      <div className="displayed-map">
        <MapContainer center={[50.1, 14.2]} zoom={5}>
          <LayersControl position="topright">
            <BaseLayer checked name="Base Map">
              <TileLayer url={baseMapUrl} />
            </BaseLayer>
            <Overlay checked name="Temperature">
              <TileLayer url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${keyAPI}`} opacity={1} zIndex={1000} />
            </Overlay>
          </LayersControl>
          <Legend />
        </MapContainer>
      </div>

      {/* <div className="card-list">
        {chosenCities.map((city, index) => {
          const targetCity = replaceSpaces(city);

          return (
            <Link to={`/city/${targetCity}`} key={index}>
              <Card city={city} key={index} />
            </Link>
          )
        })}
      </div> */}
    </>
  );
}
 
export default Home;