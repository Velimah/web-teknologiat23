import {doFetch} from './network';

const apiUrl =
  'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

/**
 * Converts HSL time to readable string format
 * @param {number} seconds
 * @returns time in string format
 */
const convertTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor(seconds % 3600 / 60);
  return `${hours}:${mins < 10 ? '0' + mins : mins}`;
};

/**
 *
 * @param seconds
 * @returns {`, ${number} min etuajassa`|`, ${number} min myöhässä`|string}
 */
const convertTimeToMinutes = (seconds) => {
  const mins = Math.floor(seconds % 3600 / 60);

  if (mins < 0) {
    return `, ${Math.abs(mins)} min etuajassa`;
  } else if (mins === 0) {
    return ``;
  } else {
    return `, ${mins} min myöhässä`;
  }
};

/**
 * https://digitransit.fi/en/developers/apis/1-routing-api/stops/#query-scheduled-departure-and-arrival-times-of-a-stop
 * e.g. Karanristi stops: 2132208 (Leppävaara direction) & 2132207
 * @param {number} lat longitude coordinate
 * @param {number} lon latitude coordinate
 */
const searchRadius = 1000;
const busStopCount = 4;
const numberOfDepartures = 5;
const getQueryForNearestStopsAndTimetables = (lat, lon,) => {
  return `{
  stopsByRadius(lat: ${lat}, lon: ${lon}, radius: ${searchRadius}, first: ${busStopCount}) {
    edges {
      node {
       stop {
      name
      lat
      lon
      stoptimesWithoutPatterns (numberOfDepartures: ${numberOfDepartures}) {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        headsign
        trip {
          routeShortName
        }
      }
    }
        distance
      }
    }
  }
}`;
};

/**
 *
 * @returns stop route data
 * @param {number} lat longitude coordinate
 * @param {number} lon latitude coordinate
 */
const getNearestStopsAndTimetables = async (lat, lon) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
      },
      body: getQueryForNearestStopsAndTimetables(lat, lon),
    };

    const routeData = await doFetch(apiUrl, false, options);

    const distance = routeData.data.stopsByRadius.edges.map((edge) => {
      return edge.node.distance;
    });
    const coords = routeData.data.stopsByRadius.edges.map((edge) => {
      return [edge.node.stop.lon, edge.node.stop.lat];
    });
    const stopName = routeData.data.stopsByRadius.edges.map((edge) => {
      return edge.node.stop.name;
    });
    const routes = routeData.data.stopsByRadius.edges.map((edge) => {
      return edge.node.stop.stoptimesWithoutPatterns.map((route) => {
        return {
          name: route.trip.routeShortName,
          headsign: route.headsign,
          arrivalDelay: convertTimeToMinutes(route.arrivalDelay),
          scheduledArrival: convertTime(route.scheduledArrival),
          realtimeArrival: convertTime(route.realtimeArrival),
        };
      });
    });

    return {
      coords,
      distance,
      stopName,
      routes,
    };
  } catch (error) {
    console.log('hsl data ei saatavilla');
  }
};

export {getNearestStopsAndTimetables};
