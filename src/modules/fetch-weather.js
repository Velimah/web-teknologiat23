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

    const location = document.createElement('div');
    location.setAttribute('class', 'location');
    location.innerHTML = `${weatherData.name}`;
    document.getElementById('weather-container1').appendChild(location);

    const image = document.createElement('img');
    image.setAttribute('class', 'weather-image');
    image.setAttribute('src', `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
    image.setAttribute('alt', `${weatherData.weather[0].description}`);
    document.getElementById('weather-container1').appendChild(image);

    const cellTemp = document.createElement('div');
    cellTemp.setAttribute('id', 'cell-1weather');
    document.getElementById('weather-container2').append(cellTemp);

    const temperatureName = document.createElement('div');
    temperatureName.setAttribute('class', 'temperature');
    if (finnish === true) {
      temperatureName.innerHTML = `Lämpötila`;
    } else {
      temperatureName.innerHTML = `Temperature`;
    }
    document.getElementById('cell-1weather').appendChild(temperatureName);

    const temperature = document.createElement('div');
    temperature.setAttribute('class', 'temperature');
    temperature.innerHTML = `${(weatherData.main.temp - 273.15).toFixed(2)} C`;
    document.getElementById('cell-1weather').appendChild(temperature);

    const cellHumidity = document.createElement('div');
    cellHumidity.setAttribute('id', 'cell-2weather');
    document.getElementById('weather-container2').append(cellHumidity);

    const humidityName = document.createElement('div');
    humidityName.setAttribute('class', 'humidity');
    if (finnish === true) {
      humidityName.innerHTML = `Ilmankosteus`;
    } else {
      humidityName.innerHTML = `Humidity`;
    }
    document.getElementById('cell-2weather').appendChild(humidityName);

    const humidity = document.createElement('div');
    humidity.setAttribute('class', 'humidity');
    humidity.innerHTML = `${weatherData.main.humidity} %`;
    document.getElementById('cell-2weather').appendChild(humidity);

    const cellClouds = document.createElement('div');
    cellClouds.setAttribute('id', 'cell-3weather');
    document.getElementById('weather-container2').append(cellClouds);

    const cloudsName = document.createElement('div');
    cloudsName.setAttribute('class', 'clouds');
    if (finnish === true) {
      cloudsName.innerHTML = `Pilvisyys`;
    } else {
      cloudsName.innerHTML = `Clouds`;
    }
    document.getElementById('cell-3weather').appendChild(cloudsName);

    const clouds = document.createElement('div');
    clouds.setAttribute('class', 'clouds');
    clouds.innerHTML = `${weatherData.clouds.all} %`;
    document.getElementById('cell-3weather').appendChild(clouds);

    const cellWind = document.createElement('div');
    cellWind.setAttribute('id', 'cell-4weather');
    document.getElementById('weather-container2').append(cellWind);

    const windName = document.createElement('div');
    windName.setAttribute('class', 'wind');
    if (finnish === true) {
      windName.innerHTML = `Tuuli`;
    } else {
      windName.innerHTML = `Wind`;
    }
    document.getElementById('cell-4weather').appendChild(windName);

    const wind = document.createElement('div');
    wind.setAttribute('class', 'wind');
    wind.innerHTML = `${weatherData.wind.speed} m/s`;
    document.getElementById('cell-4weather').appendChild(wind);

    const cellPressure = document.createElement('div');
    cellPressure.setAttribute('id', 'cell-5weather');
    document.getElementById('weather-container2').append(cellPressure);

    const pressureName = document.createElement('div');
    pressureName.setAttribute('class', 'pressure');
    if (finnish === true) {
      pressureName.innerHTML = `Ilmanpaine`;
    } else {
      pressureName.innerHTML = `Pressure`;
    }
    document.getElementById('cell-5weather').append(pressureName);

    const pressure = document.createElement('div');
    pressure.setAttribute('class', 'pressure');
    pressure.innerHTML = `${weatherData.main.pressure} hPa`;
    document.getElementById('cell-5weather').append(pressure);

    const cellDay = document.createElement('div');
    cellDay.setAttribute('id', 'cell-6weather');
    document.getElementById('weather-container2').append(cellDay);

    const dayLengthName = document.createElement('div');
    dayLengthName.setAttribute('class', 'sunrise');
    if (finnish === true) {
      dayLengthName.innerHTML = `Päivän pituus`;
    } else {
      dayLengthName.innerHTML = `Day length`;
    }
    document.getElementById('cell-6weather').appendChild(dayLengthName);

    const dayLength = document.createElement('div');
    dayLength.setAttribute('class', 'sunrise');
    dayLength.innerHTML = `${Math.floor((weatherData.sys.sunset - weatherData.sys.sunrise) / 3600)}h ${Math.round(((weatherData.sys.sunset - weatherData.sys.sunrise) % 3600) / 60)}min `;
    document.getElementById('cell-6weather').appendChild(dayLength);

  } catch (error) {
    console.log(error);
    console.log('could not fetch weather data.');
  }
};

export {getWeatherData};
