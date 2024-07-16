import { replaceSpaces } from "./functions";
import useFetch from "./useFetch";

const Card = ({city}) => {
  const {currentData} = useFetch(replaceSpaces(city));

  return (
    <div className="card">
      <h1>
        {city}
      </h1>
      {currentData &&
        <div className="card-info">
          {currentData.data.main.temp}°C {console.log('city displayed:', city)}
        </div>
      }
    </div>
  );
}
 
export default Card;