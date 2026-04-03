import './assets/styles/App.css';
import './assets/styles/Forecast.css';
import Forecast from './components/Forecast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import BottomBar from './components/BottomBar';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="city/:lon/:lat" element={<Forecast />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <BottomBar />
      </div>
    </Router>
  );
}

export default App;
