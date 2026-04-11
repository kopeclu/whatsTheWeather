import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WIND_METRIC } from "../constants";
import { WindMetricType } from "../types";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type UnitToggleProps = {
  metric: WindMetricType;
  setMetric: (metric: WindMetricType) => void;
}

const UnitToggle = ({metric, setMetric}: UnitToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-end gap-3">
      
      {isOpen && (
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-4 border border-white/60 w-48 transition-all animate-fade-in">
          
          <h4 className="text-xs font-bold text-gray-500 tracking-wider mb-3">
            Wind Speed
          </h4>
          
          <div className="flex flex-col gap-2">
            <label 
              className={`cursor-pointer px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                metric === WIND_METRIC.METERS 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white/50 text-gray-600 hover:bg-white/80 border border-white/60'
              }`}
            >
              <input
                type="radio"
                name="metric"
                value="ms"
                className="hidden" 
                checked={metric === WIND_METRIC.METERS}
                onChange={() => {
                  setMetric(WIND_METRIC.METERS);
                  setIsOpen(false); 
                }}
              />
              m/s
            </label>

            <label 
              className={`cursor-pointer px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                metric === WIND_METRIC.KNOTS 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white/50 text-gray-600 hover:bg-white/80 border border-white/60'
              }`}
            >
              <input
                type="radio"
                name="metric"
                value="kt"
                className="hidden"
                checked={metric === WIND_METRIC.KNOTS}
                onChange={() => {
                  setMetric(WIND_METRIC.KNOTS);
                  setIsOpen(false);
                }}
              />
              kt
            </label>
          </div>
          
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border border-white/40 ${
          isOpen 
            ? 'bg-white/80 text-blue-600 backdrop-blur-md'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <FontAwesomeIcon icon={faGear} className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
        <span className="font-semibold text-sm md:text-base">Metrics</span>
      </button>

    </div>
  );
}
 
export default UnitToggle;