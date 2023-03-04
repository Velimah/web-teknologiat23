"use strict";
import {weatherAPIKey} from "./api-keys";

const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + weatherAPIKey + '');

    const weatherData = await response.json();

    console.log('weather data', weatherData);

    document.getElementById('weather').innerHTML = '';

    const image = document.createElement('img');
    image.setAttribute('class', 'weather-image');
    image.setAttribute('src', `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
    image.setAttribute('alt', `${weatherData.weather[0].description}`);
    document.getElementById('weather').appendChild(image);

    const location = document.createElement('div');
    location.setAttribute('class', 'location');
    location.innerHTML = `${weatherData.name}`;
    document.getElementById('weather').appendChild(location);

    const temperature = document.createElement('div');
    temperature.setAttribute('class', 'temperature');
    temperature.innerHTML = `Temperature ${(weatherData.main.temp - 273.15).toFixed(2)} C`;
    document.getElementById('weather').appendChild(temperature);

    const humidity = document.createElement('div');
    humidity.setAttribute('class', 'humidity');
    humidity.innerHTML = `Humidity ${weatherData.main.humidity} %`;
    document.getElementById('weather').appendChild(humidity);

    const clouds = document.createElement('div');
    clouds.setAttribute('class', 'clouds');
    clouds.innerHTML = `clouds ${weatherData.clouds.all} %`;
    document.getElementById('weather').appendChild(clouds);

    const wind = document.createElement('div');
    wind.setAttribute('class', 'wind');
    wind.innerHTML = `Wind ${weatherData.wind.speed} m/s`;
    document.getElementById('weather').appendChild(wind);

    const pressure = document.createElement('div');
    pressure.setAttribute('class', 'pressure');
    pressure.innerHTML = `Pressure ${weatherData.main.pressure} hPa`;
    document.getElementById('weather').append(pressure);

    const sunrise = document.createElement('div');
    sunrise.setAttribute('class', 'sunrise');
    sunrise.innerHTML = `Sunrise: ${new Date(weatherData.sys.sunrise * 1000)}`;
    document.getElementById('weather').appendChild(sunrise);

    const sunset = document.createElement('div');
    sunset.setAttribute('class', 'sunrise');
    sunset.innerHTML = `Sunrise: ${new Date(weatherData.sys.sunset * 1000)}`;
    document.getElementById('weather').appendChild(sunset);

    const dayLength = document.createElement('div');
    dayLength.setAttribute('class', 'sunrise');
    dayLength.innerHTML = `Daylength: ${Math.floor((weatherData.sys.sunset - weatherData.sys.sunrise) / 3600)} : ${Math.round(((weatherData.sys.sunset - weatherData.sys.sunrise) % 3600) / 60)} `;
    document.getElementById('weather').appendChild(dayLength);

  } catch (error) {
    console.log(error);
    console.log('could not fetch weather data.');
  }
};

export {getWeatherData};
