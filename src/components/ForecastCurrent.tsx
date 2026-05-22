import { getIconUrl, STATS_TO_DISPLAY } from "../constants/index.ts";
import { CurrentWeather, WindMetricType } from "../types/index.ts";
import { convertTime } from "../utils/helpers.ts";
import WeatherStat from "./WeatherStat.tsx";

type ForecastCurrentProps = {
  currentData: CurrentWeather,
  metric: WindMetricType
}

const ForecastCurrent = ({currentData, metric}: ForecastCurrentProps) => {
  const { name, sys, main, weather, timezone, visibility } = currentData;
  const temp = Math.round(main.temp);
  const iconURL = getIconUrl(weather[0].icon);

  const additionalWeatherStats = [
  {
    label: "Pressure",
    value: `${main.pressure} hPa`
  },
  {
    label: "Humidity",
    value: `${main.humidity}%`
  },
  {
    label: "Sunrise",
    value: convertTime(sys.sunrise, timezone, "hours")
  },
  {
    label: "Sunset",
    value: convertTime(sys.sunset, timezone, "hours")
  },
  {
    label: "Visibility",
    value: `${(Number(visibility) / 1000).toFixed(1)} km`,
    className: "col-span-2 md:col-span-1"
  }
];

  return (
    <section className="w-full bg-white/60 backdrop-blur-md shadow-lg rounded-3xl p-6 md:p-10 border border-white/50 transition-all duration-300">
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            {name}, {sys.country}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 capitalize mt-1 mb-4 font-medium">
            {weather[0].description}
          </p>
          <div className="text-7xl md:text-8xl font-black text-black-900 tracking-tighter drop-shadow-sm">
            {temp}°
          </div>
        </div>

        <div className="w-40 h-40 md:w-56 md:h-56 flex flex-col items-center justify-center bg-linear-to-br from-blue-100/50 to-white/50 rounded-full shadow-inner border border-white/60">
          <img src={iconURL} alt={weather[0].main} className="w-24 md:w-32 object-contain drop-shadow-md" />
          <h2 className="text-lg font-semibold text-gray-700 -mt-2">{weather[0].main}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
        {STATS_TO_DISPLAY.map((el, index) => (
          <WeatherStat
            key={index}
            type={el}
            data={currentData}
            windMetric={metric}
            current={true}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 pt-6 border-t border-white/50 animate-fade-in-down">
        
        {additionalWeatherStats.map(stat => (
          <div className={`flex flex-col items-center p-3 ${stat.className || ''}`}>
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
              {stat.label}
            </span>
            <span className="text-lg font-bold text-gray-800">
              {stat.value}
            </span>
          </div>
        ))}

      </div>

    </section>
  );
}
 
export default ForecastCurrent;