export const BASE_MAP_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

export const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeatherUrl = (lat: string | undefined, lon: string | undefined, apiKey: string) => {
  return `${BASE_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
};

export const getForecastUrl = (lat: string | undefined, lon: string | undefined, apiKey: string) => {
  return `${BASE_WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
};

export const getMapOverlayUrl = (apiKey: string) => {
  return `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`;
}

export const getIconUrl = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export const WIND_METRIC = {
  METERS: "m/s",
  KNOTS: "kt"
} as const;

export const STATS_TO_DISPLAY = ["temp", "rain", "wind", "clouds"] as const;

