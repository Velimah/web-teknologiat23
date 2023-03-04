import {getNearestStopsAndTimetables} from "./fetch-hsl";
import {addCurrentPositionMarker, addStopMarker} from "./map";

const renderHSLData = async (latitude, longitude) => {
  try {
    const stops = await getNearestStopsAndTimetables(latitude, longitude);
    console.log('hösselidata', stops);

    const dataBox = document.getElementById('hsl-data');
    dataBox.innerHTML = '';

    const marker = document.createElement('div');
    marker.setAttribute('class', 'youre-here');
    marker.innerHTML = 'Olet tässä';
    dataBox.append(marker);

    for (let i = 0; i < stops.stopName.length; i++) {
      const lineContainer = document.createElement('div');
      lineContainer.setAttribute('class', 'line-container');
      if (i === 0) {
        lineContainer.style.borderColor = '#ff7700';
        lineContainer.style.backgroundColor = 'rgba(255,119,0,0.3)';
      } else if (i === 1) {
        lineContainer.style.borderColor = '#36ff00';
        lineContainer.style.backgroundColor = 'rgba(54,255,0,0.3)';
      } else if (i === 2) {
        lineContainer.style.borderColor = '#0029ff';
        lineContainer.style.backgroundColor = 'rgba(0,41,255,0.3)';
      } else if (i === 3) {
        lineContainer.style.borderColor = '#c600ff';
        lineContainer.style.backgroundColor = 'rgba(198,0,255,0.3)';
      } else if (i === 4) {
        lineContainer.style.borderColor = '#fffb00';
        lineContainer.style.backgroundColor = 'rgba(255,251,0,0.3)';
      } else if (i === 5) {
        lineContainer.style.borderColor = '#00ffc4';
        lineContainer.style.backgroundColor = 'rgba(0,255,196,0.3)';
      }

      const stopName = document.createElement('div');
      stopName.setAttribute('class', 'stop-name');
      stopName.innerHTML = `${stops.stopName[i]}`;
      lineContainer.appendChild(stopName);

      const stopDistance = document.createElement('div');
      stopDistance.setAttribute('class', 'stop-name');
      stopDistance.innerHTML = `${stops.distance[i]} m`;
      lineContainer.appendChild(stopDistance);

      const stopBus = stops.routes[i];
      for (let i = 0; i < stopBus.length; i++) {
        const routeInfo = document.createElement('div');
        routeInfo.textContent = `${stopBus[i].name} ${stopBus[i].headsign}, saapuu ${stopBus[i].realtimeArrival} ${stopBus[i].arrivalDelay}`;
        lineContainer.append(routeInfo);
      }
      dataBox.append(lineContainer);

      addCurrentPositionMarker(latitude, longitude);
      addStopMarker(stops.coords[i], i);
    }
  } catch (error) {
    console.log('hsl data ei saatavilla');
  }
};

export {renderHSLData};
