import { faHouse, faLocationCrosshairs, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCoords, replaceSpaces } from "./functions";

const Header = () => {
  const [city, setCity] = useState('');
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

  const getUserLocation = (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      alert('supported geolocation');
    } else {
      alert('geolocation not suported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      navigate(`/city/${lon}/${lat}`);
    },
    (error) => {
      console.error(error);
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
        default:
          console.log('unknow problem');
          break;
      }
    }, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000
    })
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
    </div>
  );
}
 
export default Header;