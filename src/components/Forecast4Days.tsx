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
    <div className="forecast4">
      <div className="forecast4-days">
        {dayNames.map((day, index) => (
          <button
            className={index === selectedDay ? 'selected' : ''}
            key={index}
            onClick={() => setSelectedDay(index)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="forecast4-content">
        {daysData[selectedDay].map((data, index) => (
          <ForecastBox
            key={index}
            data={data}
            timezone={futureData.city.timezone}
            metric={metric}
          />
        ))}
      </div>
    </div>
  );
}
 
export default Forecast4Days;