import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { replaceSpaces } from "./functions";

const Header = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // setCity(replaceSpaces(city));
    navigate(`/city/${replaceSpaces(city)}`);
    setCity('');
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
      </div>
    </div>
  );
}
 
export default Header;