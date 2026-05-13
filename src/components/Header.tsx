import { faHouse, faLocationCrosshairs, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, SubmitEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCoords, replaceSpaces } from "../utils/helpers.ts";

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
      console.log("Getting coordinations has failed.", err);
      navigate('/404');
    }
  }

  const getUserLocation: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setSearching(true);

    const watchID = navigator.geolocation.watchPosition((position) => {
      navigator.geolocation.clearWatch(watchID);
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      setSearching(false);
      navigate(`/city/${lon}/${lat}`);
    }, () => {
      navigator.geolocation.clearWatch(watchID);
      console.log("navigator.geolocation.watchPosition has failed.");
      setSearching(false);
    }, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
    })
  }

  return (
    <div className="relative">
      <Link
        to="/"
        id="home1"
        className="hidden md:flex absolute top-10 left-4 md:left-10 items-center justify-center bg-white/40 hover:bg-white/50 backdrop-blur-md shadow-lg rounded-2xl px-4 py-3 md:px-6 md:py-4 text-gray-800 transition-all text-lg md:text-xl font-medium"
      >
        Home
      </Link>
      <div className="flex justify-center bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgb(220,240,255)_100%),url('../images/clouds.jpg')] bg-cover bg-top bg-no-repeat pt-10 pb-50">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white/40 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden transition-all"
        >
          <Link
            to="/"
            className="px-4 py-3 sm:px-6 sm:py-4 text-gray-800 hover:bg-white/30 transition-colors cursor-pointer text-lg sm:text-xl md:text-2xl md:hidden"
            >
            <FontAwesomeIcon icon={faHouse} className="" />
          </Link>
          <button
            type="submit"
            className="px-4 py-3 sm:px-6 sm:py-4 text-gray-800 hover:bg-white/30 transition-colors cursor-pointer text-lg sm:text-xl md:text-2xl"  
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type='text'
            placeholder='Find a city'
            value={city}
            onChange={(e) => {setCity(e.target.value)}}
            className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-700 px-4 py-3 sm:px-6 sm:py-4 text-lg sm:text-xl md:text-2xl w-37.5 sm:w-50 md:w-72"
          />
          <button
            onClick={getUserLocation}
            className="px-4 py-3 sm:px-6 sm:py-4 text-gray-800 hover:bg-white/30 transition-colors cursor-pointer text-lg sm:text-xl md:text-2xl"
          >
            <FontAwesomeIcon icon={faLocationCrosshairs} />
          </button>
        </form>
      </div>
      {searching &&
        <div className="text-center py-6">
          <h2 className="text-2xl font-semibold text-blue-600 animate-pulse">Loading...</h2>
        </div>
      }
    </div>
  );
}
 
export default Header;