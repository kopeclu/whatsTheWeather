import './assets/styles/App.css';
import Forecast from './pages/Forecast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import 'leaflet/dist/leaflet.css';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="city/:lon/:lat" element={<Forecast />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
