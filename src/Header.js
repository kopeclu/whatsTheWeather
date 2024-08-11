import { faHouse, faLocationCrosshairs, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { detectPlatform, getCoords, replaceSpaces } from "./functions";
import axios from "axios";

const Header = () => {
  const [city, setCity] = useState('');
  const [searching, setSearching] = useState(false);
  const googleApiKey = process.env.REACT_APP_GOOGLE_KEY;
  // const apiKey = process.env.REACT_APP_HERE_API;
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

    // const response = await axios.post(`https://pos.ls.hereapi.com/positioning/v1/locate?apiKey=${apiKey}`);
    // console.log(response);

    console.log(detectPlatform());

    // if (detectPlatform() === 'Mobile'){
      try {
        setSearching(true);
        const result = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`);
        console.log(result);
        const {location} = result.data;
        const lon = location.lng;
        const lat = location.lat;
        setSearching(false);
        navigate(`/city/${lon}/${lat}`);
      } catch (err) {
        console.log(err);
      }
    // } else {
      setSearching(true);
      
      const watchID = navigator.geolocation.watchPosition((position) => {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        setSearching(false);
        navigate(`/city/${lon}/${lat}`);
      },
      (error) => {
        console.error(error);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
          default:
            console.log('unknow problem');
            break;
        }
        setSearching(false);
      }, {
        enableHighAccuracy: true,
        maximumAge: 100,
        timeout: 10000
      })

      setTimeout( () => {
        navigator.geolocation.clearWatch(watchID)
      }, 10000);
    // }
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