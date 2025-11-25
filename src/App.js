import './assets/styles/App.css';
import './assets/styles/Card.css';
import './assets/styles/Header.css';
import './assets/styles/Forecast.css';
import Forecast from './components/Forecast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import BottomBar from './components/BottomBar';
import 'leaflet/dist/leaflet.css';

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
