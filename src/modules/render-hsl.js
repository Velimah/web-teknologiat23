import {getRoutesByStopId} from "./fetch-hsl";
import {addCurrentPositionMarker, addStopMarker} from "./map";

const renderHSLData = async (latitude, longitude) => {

  const stops = await getRoutesByStopId(latitude, longitude);
  console.log('hösselidata', stops);

  const dataBox = document.getElementById('hsl-data');
  dataBox.innerHTML = '';

  const marker = document.createElement('div');
  marker.setAttribute('class', 'youre-here');
  marker.innerHTML = 'Olet tässä';
  dataBox.append(marker);

  let i = 0;
  for (const stop in stops) {

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
      lineContainer.style.borderColor = '#ff00ae';
      lineContainer.style.backgroundColor = 'rgba(255,0,174,0.3)';
    } else if (i === 5) {
      lineContainer.style.borderColor = '#00ffc4';
      lineContainer.style.backgroundColor = 'rgba(0,255,196,0.3)';
    }

    const stopName = document.createElement('div');
    stopName.setAttribute('class', 'stop-name');
    stopName.innerHTML = `${stops.stopName[i]}`;
    lineContainer.appendChild(stopName);
    console.log(stops.stopName[i]);

    const stopDistance = document.createElement('div');
    stopDistance.setAttribute('class', 'stop-name');
    stopDistance.innerHTML = `${stops.distance[i - 1]} m`;
    lineContainer.appendChild(stopDistance);

    for (const route of stops.routes) {
      console.log(stops.routes[i]);
      console.log(route[i].name);
      const routeInfo = document.createElement('div');
      routeInfo.textContent = `${route[i].name} ${route[i].headsign}, saapuu ${route[i].realtimeArrival} ${route[i].arrivalDelay}`;
      lineContainer.append(routeInfo);
    }
    dataBox.append(lineContainer);

    addCurrentPositionMarker(latitude, longitude);
    addStopMarker(stops.coords[i], i);
    i++;
  }
};

export {renderHSLData};
