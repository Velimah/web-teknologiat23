"use strict";
import {weatherAPIKey} from "./api-keys";
const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+weatherAPIKey+'');

    const weatherData = await response.json();

    console.log('weather data', weatherData);

    document.getElementById('weather').innerHTML= '';

    const image = document.createElement('img');
    image.setAttribute('class', 'temperature');
    image.setAttribute('src', `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
    image.setAttribute('alt', `${weatherData.weather[0].description}`);
    document.getElementById('weather').append(image);

    const location = document.createElement('div');
    location.setAttribute('class', 'temperature');
    location.innerHTML = `${weatherData.name}`;
    document.getElementById('weather').append(location);

    const temperature = document.createElement('div');
    temperature.setAttribute('class', 'temperature');
    temperature.innerHTML = `Temperature ${(weatherData.main.temp-273.15).toFixed(2)} C`;
    document.getElementById('weather').append(temperature);

    const humidity = document.createElement('div');
    humidity.setAttribute('class', 'humidity');
    humidity.innerHTML = `Humidity ${weatherData.main.humidity} %`;
    document.getElementById('weather').append(humidity);

    const clouds = document.createElement('div');
    clouds.setAttribute('class', 'humidity');
    clouds.innerHTML = `clouds ${weatherData.clouds.all} %`;
    document.getElementById('weather').append(clouds);

    const wind = document.createElement('div');
    wind.setAttribute('class', 'wind');
    wind.innerHTML = `Wind ${weatherData.wind.speed} m/s`;
    document.getElementById('weather').append(wind);

    const windGust = document.createElement('div');
    windGust.setAttribute('class', 'wind');
    windGust.innerHTML = `Wind ${weatherData.wind.gust} m/s`;
    document.getElementById('weather').append(windGust);

    const pressure = document.createElement('div');
    pressure.setAttribute('class', 'pressure');
    pressure.innerHTML = `Pressure ${weatherData.main.pressure} hPa`;
    document.getElementById('weather').append(pressure);

  } catch (error) {
    console.log(error);
    console.log('could not fetch weather data.');
  }
};

export {getWeatherData};
