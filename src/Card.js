import { getUrl, replaceSpaces } from "./functions";
import useHomeFetch from "./useHomeFetch";

const Card = ({city}) => {
  const {currentData} = useHomeFetch(replaceSpaces(city));

  return (
    <>
    {!currentData &&
      <div>
        Loading...
      </div>
    }
    {currentData &&
      <div className="card">
        <h1>
          {city}
        </h1>
        <div className="card-info">
          <img src={getUrl(currentData.data.weather[0].icon)} alt="city icon"/>
          <div>
            {currentData.data.main.temp}°C {console.log('city displayed:', city)}
          </div>
        </div>
      </div>
    }
    </>
  );
}
 
export default Card;