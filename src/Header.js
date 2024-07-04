import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = ({city, setCity}) => {
  const [inputValue, setInputValue] = useState('');

  const replaceSpaces = (word) => {
    return word.replace(' ', '-');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setCity(replaceSpaces(inputValue));
    setInputValue('');
  }

  return (
    <div className="header">
      <form id="cityInput" onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Find a city'
          value={inputValue}
          onChange={(e) => {setInputValue(e.target.value)}}/>
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
}
 
export default Header;