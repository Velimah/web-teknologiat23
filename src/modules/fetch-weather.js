"use strict";
import {weatherAPIKey} from "./api-keys";

const getWeatherData = async (lat, lon, finnish) => {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + weatherAPIKey + '');
    if (!response.ok) {
      throw new Error('http error, code: ' + response.status);
    }

    const weatherData = await response.json();

    document.getElementById('weather').innerHTML = '';

    const container1 = document.createElement('div');
    container1.setAttribute('id', 'weather-container1');
    document.getElementById('weather').appendChild(container1);
    const container2 = document.createElement('div');
    container2.setAttribute('id', 'weather-container2');
    document.getElementById('weather').appendChild(container2);
    const container3 = document.createElement('div');
    container3.setAttribute('id', 'weather-container3');
    document.getElementById('weather').appendChild(container3);

    const location = document.createElement('div');
    location.setAttribute('class', 'location');
    location.innerHTML = `&nbsp&nbsp&nbsp${weatherData.name}`;
    document.getElementById('weather-container1').appendChild(location);

    const image = document.createElement('img');
    image.setAttribute('class', 'weather-image');
    image.setAttribute('src', `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
    image.setAttribute('alt', `${weatherData.weather[0].description}`);
    document.getElementById('weather-container1').appendChild(image);

    const temperature = document.createElement('div');
    temperature.setAttribute('class', 'temperature');
    if (finnish === true) {
      temperature.innerHTML = `Lämpötila: ${(weatherData.main.temp - 273.15).toFixed(2)} C`;
    } else {
      temperature.innerHTML = `Temperature: ${(weatherData.main.temp - 273.15).toFixed(2)} C`;
    }
    document.getElementById('weather-container2').appendChild(temperature);

    const humidity = document.createElement('div');
    humidity.setAttribute('class', 'humidity');
    if (finnish === true) {
      humidity.innerHTML = `Ilmankosteus: ${weatherData.main.humidity} %`;
    } else {
      humidity.innerHTML = `Humidity: ${weatherData.main.humidity} %`;
    }
    document.getElementById('weather-container3').appendChild(humidity);

    const clouds = document.createElement('div');
    clouds.setAttribute('class', 'clouds');
    if (finnish === true) {
      clouds.innerHTML = `Pilvisyys: ${weatherData.clouds.all} %`;
    } else {
      clouds.innerHTML = `Clouds: ${weatherData.clouds.all} %`;
    }
    document.getElementById('weather-container2').appendChild(clouds);

    const wind = document.createElement('div');
    wind.setAttribute('class', 'wind');
    if (finnish === true) {
      wind.innerHTML = `Tuuli: ${weatherData.wind.speed} m/s`;
    } else {
      wind.innerHTML = `Wind: ${weatherData.wind.speed} m/s`;
    }
    document.getElementById('weather-container2').appendChild(wind);

    const pressure = document.createElement('div');
    pressure.setAttribute('class', 'pressure');
    if (finnish === true) {
      pressure.innerHTML = `Ilmanpaine: ${weatherData.main.pressure} hPa`;
    } else {
      pressure.innerHTML = `Pressure: ${weatherData.main.pressure} hPa`;
    }
    document.getElementById('weather-container3').append(pressure);

    const dayLength = document.createElement('div');
    dayLength.setAttribute('class', 'sunrise');
    if (finnish === true) {
      dayLength.innerHTML = `Päivän pituus: ${Math.floor((weatherData.sys.sunset - weatherData.sys.sunrise) / 3600)}h ${Math.round(((weatherData.sys.sunset - weatherData.sys.sunrise) % 3600) / 60)}min `;
    } else {
      dayLength.innerHTML = `Day length: ${Math.floor((weatherData.sys.sunset - weatherData.sys.sunrise) / 3600)}h ${Math.round(((weatherData.sys.sunset - weatherData.sys.sunrise) % 3600) / 60)}min `;
    }
    document.getElementById('weather-container3').appendChild(dayLength);

  } catch (error) {
    console.log(error);
    console.log('could not fetch weather data.');
  }
};

export {getWeatherData};
