import { useState } from "react";
import Element4Days from "./Element4Days";
import { convertTime } from "../utils/helpers";

const Forecast4Days = ({futureData, timePresent, timezone, metric}) => {
  const [selectedDay, setSelectedDay] = useState(0);


  // Slice the array for separate days (3 hours * 8 for each day)
  const sliceArray = (array, chunkSize) => {
    let result = [];
    for (let i = 0; i < 31; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Separate the data for following 4 days
  const getFourDaysData = (fullData, timezone, timePresent) => {
    let tmpArray = [];
    let fourDaysData = [];
    let fourDaysString = [];

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
      const options = { weekday: 'long' }; // 'long' gives the full name, 'short' gives the abbreviated name
      fourDaysString.push(date.toLocaleDateString('en-US', options));
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
      <Element4Days data={fourDaysData[selectedDay]} timezone={futureData.city.timezone} metric={metric} />
    </div>
  );
}
 
export default Forecast4Days;