import './App.css';
import './Header.css';
import './Forecast.css';
import Forecast from './Forecast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Home';
import Error404 from './Error404';
import BottomBar from './BottomBar';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="city/:lon/:lat" element={<Forecast />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <BottomBar />
      </div>
    </Router>
  );
}

export default App;
