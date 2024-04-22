import axios from 'axios';

import { useAppDispatch } from '@/store/store';
import { useNotify } from './useNotify';
import { setPosition, setSystem, setWeather } from '@/store/reducers/authReducer';

export const useOperatingSystem = () => {
  const platform = window.navigator.platform;
  let os = 'Unknown OS';

  if (platform.includes('Win')) {
    os = 'Windows';
  } else if (platform.includes('Mac')) {
    os = 'Mac';
  }

  useAppDispatch(setSystem(os)); // set system to store
};

export const usePosition = () => {
  navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
};

const foundLocation = (position: GeolocationPosition) => {
  //get latitude and longitude
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  useWeather(latitude, longitude); // fetch weather data

  useAppDispatch(setPosition({ latitude, longitude })); // set position to store
};

const noLocation = (error: GeolocationPositionError) => {
  useNotify('error', error.message ? error.message : 'Error occurred while fetching location');
};

const useWeather = (lat: number, log: number) => {
  const key = 'e1709d64b4e5713535d0f73c908df6ae';

  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${key}`)
    .then((res) => {
      console.log('weather---', res.data);
      useAppDispatch(
        setWeather({
          weather: res.data.weather[0].main,
          description: res.data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`,
          temp: res.data.main.temp,
          feels_like: res.data.main.feels_like,
          clouds: res.data.clouds.all,
          humidity: res.data.main.humidity,
          system: {
            country: res.data.sys.country,
            name: res.data.name,
            sunrise: res.data.sys.sunrise,
            sunset: res.data.sys.sunset,
            timezone: res.data.timezone
          },
          wind: { speed: res.data.wind.speed, deg: res.data.wind.deg }
        })
      );
    })
    .catch((err) => {
      console.log('error---', err);
    });
};
