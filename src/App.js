import './App.css';
import './Card.css';
import './Header.css';
import './Forecast.css';
import Forecast from './Forecast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Home';
import Error404 from './Error404';
import BottomBar from './BottomBar';

function App() {
  /**
   * design bottom bar
   * design error
   * novy klic
   * zprovoznit home page
   * design karet
   * text na home page: upozornit na zvlastni vyhledavani
   * animace infa u card
   */

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="city/:city" element={<Forecast />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <BottomBar />
      </div>
    </Router>
  );
}

export default App;
