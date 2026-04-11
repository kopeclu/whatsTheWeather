import { useState } from "react";
import { getFourDaysData } from "../utils/helpers.ts";
import ForecastBox from "./ForecastBox.tsx";
import { ForecastData, WindMetricType } from "../types/index.ts";

type Forecast4DaysProps = {
  futureData: ForecastData,
  timePresent: number,
  timezone: number,
  metric: WindMetricType
}

const Forecast4Days = ({futureData, timePresent, timezone, metric}: Forecast4DaysProps) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const {daysData, dayNames} = getFourDaysData(futureData.list, timezone, timePresent);

  return (
    <section className="w-full bg-white/60 backdrop-blur-md shadow-lg rounded-3xl p-6 md:p-8 border border-white/50">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2 flex items-center gap-2">
        4-Day Forecast
      </h2>

      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 px-2">
        {dayNames.map((day, index) => (
          <button
            key={day}
            onClick={() => setSelectedDay(index)}
            className={`px-5 py-2.5 rounded-2xl font-semibold cursor-pointer ${
              index === selectedDay
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-white/50 text-gray-600 hover:bg-white/80 border border-white/60 hover:text-gray-800'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div 
        key={selectedDay}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 snap-x snap-mandatory animate-fade-in"
      >
        {daysData[selectedDay].map((data) => (
          <div key={data.dt} className="h-full">
            <ForecastBox
              data={data}
              timezone={timezone}
              metric={metric}
            />
          </div>
        ))}
      </div>
      
    </section>
  );
}
 
export default Forecast4Days;