import { ForecastData, WindMetricType } from "../types";
import ForecastBox from "./ForecastBox";

type Forecast24HoursProps = {
  futureData: ForecastData,
  metric: WindMetricType
}

const Forecast24Hours = ({futureData, metric}: Forecast24HoursProps) => {
  const next24Hours = futureData.list.slice(0, 8);
  const timezone = futureData.city.timezone;

  return (
    <section className="w-full bg-white/60 backdrop-blur-md shadow-lg rounded-3xl p-6 md:p-8 border border-white/50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2 flex items-center gap-2">
        Next 24 Hours
      </h2>
      <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 snap-x snap-mandatory">
        {next24Hours.map((el, index) => (
            <ForecastBox
            key={index}
            data={el}
            timezone={timezone}
            metric={metric}
            />
        ))}
      </div>
    </section>
  );
}
 
export default Forecast24Hours;