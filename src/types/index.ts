// --- SHARED PIECES ---

import { STATS_TO_DISPLAY, WIND_METRIC } from "../constants";

export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number; 
  grnd_level?: number;
  temp_kf?: number;
};

export type WindData = {
  speed: number;
  deg: number;
  gust?: number;
};

export type PrecipitationData = {
  "1h"?: number;
  "3h"?: number; 
};


// --- CURRENT WEATHER ---

export type CurrentWeather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  rain?: PrecipitationData;
  snow?: PrecipitationData;
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};


// --- 5-DAY FORECAST ---

export type ForecastItem = {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: { all: number };
  wind: WindData;
  visibility: number;
  pop: number;
  rain?: PrecipitationData;
  snow?: PrecipitationData;
  sys: { pod: string }; 
  dt_txt: string; 
};

export type ForecastData = {
  cod: string;
  message: number | string;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

// --- OTHER ---

export type WindMetricType = typeof WIND_METRIC[keyof typeof WIND_METRIC];

export type StatType = typeof STATS_TO_DISPLAY[number];