import { faHouse, faLocationCrosshairs, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, SubmitEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCoords, replaceSpaces } from "../utils/helpers.ts";
import { isMobile } from "react-device-detect";

const Header = () => {
  const [city, setCity] = useState('');
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
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

  const getUserLocation: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    
    if (isMobile)
      // This feature is not working for android - known problem, no solution found so far
      alert('This feature is not 100% accurate and may not work on mobile devices.');

    setSearching(true);

    const watchID = navigator.geolocation.watchPosition((position) => {
      navigator.geolocation.clearWatch(watchID);
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      setSearching(false);
      navigate(`/city/${lon}/${lat}`);
    }, (error) => {
      navigator.geolocation.clearWatch(watchID);
      console.log(error);
      setSearching(false);
    }, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
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
      {searching &&
        <h2 className="loading">Loading...</h2>
      }
    </div>
  );
}
 
export default Header;