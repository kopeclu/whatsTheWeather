import { useState } from "react";
import { convertTime } from "../utils/helpers.ts";
import ForecastBox from "./ForecastBox.tsx";
import { ForecastData, ForecastItem, WindMetricType } from "../types/index.ts";

type Forecast4DaysProps = {
  futureData: ForecastData,
  timePresent: number,
  timezone: number,
  metric: WindMetricType
}

const Forecast4Days = ({futureData, timePresent, timezone, metric}: Forecast4DaysProps) => {
  const [selectedDay, setSelectedDay] = useState(0);


  // Slice the array for separate days (3 hours * 8 for each day)
  const sliceArray = (array: Array<ForecastItem>, chunkSize: number) => {
    let result = Array<Array<ForecastItem>>();
    for (let i = 0; i < 31; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Separate the data for following 4 days
  const getFourDaysData = (fullData: Array<ForecastItem>, timezone: number, timePresent: number) => {
    let tmpArray = Array<ForecastItem>();
    let fourDaysData = Array<Array<ForecastItem>>();
    let fourDaysString = Array<string>();

    fullData.forEach((el) => {
      if (convertTime(el.dt, timezone, 'day') !== convertTime(timePresent, timezone, 'day')){
        tmpArray.push(el);
      }
    })

    fourDaysData = sliceArray(tmpArray, 8);

    // Get string of the four days
    fourDaysData.forEach((el) => {
      const date1 = convertTime(el[0].dt, timezone, 'date');
      const date = new Date(date1);
      fourDaysString.push(date.toLocaleDateString('en-US', { weekday: 'long' }));  // 'long' gives the full name, 'short' gives the abbreviated name
    })

    return {fourDaysData, fourDaysString};
  }

  const {fourDaysData, fourDaysString} = getFourDaysData(futureData.list, timezone, timePresent);

  return (
    <div className="forecast4">
      <div className="forecast4-days">
        {fourDaysString.map((day, index) => (
          <button className={index === selectedDay ? 'selected' : ''} key={index} onClick={() => setSelectedDay(index)}>
            {day}
          </button>
        ))}
      </div>
      <div className="forecast4-content">
        {fourDaysData[selectedDay].map((data, index) => (
          <ForecastBox key={index} data={data} timezone={futureData.city.timezone} metric={metric} />
        ))}
      </div>
    </div>
  );
}
 
export default Forecast4Days;