import {getNearestStopsAndTimetables} from "./fetch-hsl";
import {addCurrentPositionMarker, addStopMarker} from "./map";

const renderHSLData = async (latitude, longitude, finnish) => {
  try {
    const stops = await getNearestStopsAndTimetables(latitude, longitude);

    const dataBox = document.getElementById('hsl-data');
    dataBox.innerHTML = '';

    const marker = document.createElement('div');
    marker.setAttribute('class', 'youre-here');
    if (finnish === true) {
      marker.innerHTML = 'Olet tässä';
    } else {
      marker.innerHTML = 'You are Here';
    }
    dataBox.append(marker);

    for (let i = 0; i < stops.stopName.length; i++) {
      const lineContainer = document.createElement('div');
      lineContainer.setAttribute('class', 'line-container');
      if (i === 0) {
        lineContainer.style.borderColor = '#ff5000';
        lineContainer.style.backgroundColor = 'rgba(255,80,0,0.5)';
      } else if (i === 1) {
        lineContainer.style.borderColor = '#e384c4';
        lineContainer.style.backgroundColor = 'rgba(227,132,196,0.5)';
      } else if (i === 2) {
        lineContainer.style.borderColor = '#4046a8';
        lineContainer.style.backgroundColor = 'rgba(64,70,168,0.5)';
      } else if (i === 3) {
        lineContainer.style.borderColor = '#3ba88f';
        lineContainer.style.backgroundColor = 'rgba(59,168,143,0.5)';
      } else if (i === 4) {
        lineContainer.style.borderColor = '#fff000';
        lineContainer.style.backgroundColor = 'rgba(255,240,0,0.5)';
        lineContainer.style.boxShadow = '0px 0px 3px 1px #fff000';
      } else if (i === 5) {
        lineContainer.style.borderColor = '#cb2228';
        lineContainer.style.backgroundColor = 'rgba(203,34,40,0.5)';
        lineContainer.style.boxShadow = '0px 0px 3px 1px #cb2228';
      }

      const stopName = document.createElement('div');
      stopName.setAttribute('class', 'stop-name');
      stopName.innerHTML = `${stops.stopName[i]} &nbsp ${stops.distance[i]} m`;
      lineContainer.appendChild(stopName);

      const stopBus = stops.routes[i];
      for (let i = 0; i < stopBus.length; i++) {

        const container = document.createElement('div');
        container.setAttribute('class', 'timetable-container');
        lineContainer.appendChild(container);

        const routeInfo = document.createElement('div');
        routeInfo.setAttribute('class', 'route-info');
        routeInfo.textContent = `${stopBus[i].name}`;
        container.appendChild(routeInfo);

        const routeDestination = document.createElement('div');
        routeDestination.setAttribute('class', 'route-destination');
        routeDestination.textContent = `${stopBus[i].headsign}`;
        container.appendChild(routeDestination);

        const routeTime = document.createElement('div');
        routeTime.setAttribute('class', 'route-time');
        routeTime.textContent = `${stopBus[i].realtimeArrival}`;
        container.appendChild(routeTime);
      }
      dataBox.appendChild(lineContainer);

      addCurrentPositionMarker(latitude, longitude);
      addStopMarker(stops.coords[i], i);
    }
  } catch (error) {
    console.log('hsl data ei saatavilla');
  }
};

export {renderHSLData};
