import './App.css';
import './Card.css';
import './Header.css';
import './Forecast.css';
import Header from './Header';
import { useState } from 'react';
import Card from './Card';
import Forecast from './Forecast';
import useFetch from './useFetch';

function App() {
/**
 * 
 * predelat fetch futuredata, aby to slo vytvorit bez .map()
 * 
 * ve futureforecast udelat sekci na 24h a 5 dni
 */

  const [city, setCity] = useState();
  // const isInitialRender = useRef(true);
  const {currentData, futureData, isPending, isError} = useFetch(city);


  // useEffect(() => {
  //   if (isInitialRender.current) {
  //     isInitialRender.current = false;
  //     return;
  //   }

  //   const {currentData, futureData, isError} = useFetch(city);
  // }, [city])

  return (
    <div className="App">
      <Header city={city} setCity={setCity}/>
      { isPending &&
        <div>
          Loading...
        </div>
      }
      { isError && 
        <div>
          An error occures! :(
        </div>
      }
      { futureData && currentData && 
        <Forecast futureData={futureData} currentData={currentData} />
      }
      <Card />
    </div>
  );
}

export default App;
