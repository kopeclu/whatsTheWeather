import Header from "./Header"
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import Legend from "./Legend";

const Home = () => {

  const { BaseLayer, Overlay } = LayersControl;
  const baseMapUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  const keyAPI = process.env.REACT_APP_KEY;

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
    </>
  );
}
 
export default Home;