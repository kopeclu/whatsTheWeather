import { faHouse, faLocationCrosshairs, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCoords, replaceSpaces } from "./functions";
import axios from "axios";

const Header = () => {
  const [city, setCity] = useState('');
  const [searching, setSearching] = useState(false);
  const googleApiKey = process.env.REACT_APP_GOOGLE_KEY;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {lon, lat} = await getCoords(replaceSpaces(city));
      navigate(`/city/${lon}/${lat}`);
      setCity('');
    } catch (err) {
      console.log(err);
      navigate('/404');
    }
  }

  const getUserLocation = async (e) => {
    e.preventDefault();

    try {
      setSearching(true);
      console.log(googleApiKey);
      const result = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`);
      const {location} = result.data;
      const lon = location.lng;
      const lat = location.lat;
      setSearching(false);
      navigate(`/city/${lon}/${lat}`);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="header-space">
      <Link to="/" id="home1">Home</Link>
      <div className="header">
        <Link to="/" id="home2">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <form id="cityInput" onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Find a city'
            value={city}
            onChange={(e) => {setCity(e.target.value)}}/>
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        <button id="locate-btn" onClick={getUserLocation}>
          <FontAwesomeIcon icon={faLocationCrosshairs} />
        </button>
      </div>
      {searching &&
        <h2 className="loading">Loading...</h2>
      }
    </div>
  );
}
 
export default Header;