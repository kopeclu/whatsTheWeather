import { faHouse, faLocationCrosshairs, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTested, replaceSpaces } from "./functions";

const Header = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log('handle submit');
    e.preventDefault();
    const {lon, lat} = await getTested(replaceSpaces(city));
    navigate(`/city/${lon}/${lat}`);
    setCity('');
  }

  const getUserLocation = (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      navigate(`/city/${lon}/${lat}`);
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
          <div id="locate-btn" onClick={getUserLocation}>
            <FontAwesomeIcon icon={faLocationCrosshairs} />
          </div>
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
    </div>
  );
}
 
export default Header;