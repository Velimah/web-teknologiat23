import {doFetch} from './network';

const apiUrl =
  'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

const searchRadius = 500;
const busStopCount = 6;
const getQueryForNearestStops = (lat, lon) => {
  return `{
  stopsByRadius(lat: ${lat}, lon: ${lon}, radius: ${searchRadius}, last: ${busStopCount}) {
    edges {
      node {
        stop {
          gtfsId
          name
          lat
          lon
          code
        }
        distance
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;
};

/**
 * https://digitransit.fi/en/developers/apis/1-routing-api/stops/#query-scheduled-departure-and-arrival-times-of-a-stop
 * @param {number} id - id number of the hsl stop
 * e.g. Karanristi stops: 2132208 (Leppävaara direcrion) & 2132207
 */

const getQueryForNextRidesByStopId = (id) => {
  return `{
    stop(id: "HSL:${id}") {
      name
      lat
      lon
      vehicleMode
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        headsign
        trip {
          routeShortName
          tripHeadsign
        }
      }
    }
  }`;
};

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

const convertTimeToMins = (seconds) => {
  const mins = Math.floor(seconds % 3600 / 60);

  if (mins < 0) {
    return `, ${Math.abs(mins)} min etuajassa`;
  } else if (mins === 0) {
    return ``;
  } else {
    return `, ${mins} min myöhässä`;
  }
};

const getNearestStops = async (lat, lon) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: getQueryForNearestStops(lat, lon),
  };

  const routeData = await doFetch(apiUrl, false, options);

  const routes = routeData.data.stopsByRadius.edges.map((edge) => {
    return edge.node.stop.gtfsId;
  });
  const distance = routeData.data.stopsByRadius.edges.map((edge) => {
    return edge.node.distance;
  });

  return {
    routes,
    distance,
  };
};

/**
 *
 * @param {number} id - hsl stop id (HSL:<id>)
 * @returns stop route data
 */

const getRoutesByStopId = async (id) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: getQueryForNextRidesByStopId(id),
  };

  const routeData = await doFetch(apiUrl, false, options);

  const coords = [routeData.data.stop.lon, routeData.data.stop.lat];
  const stopName = routeData.data.stop.name;

  const routes = routeData.data.stop.stoptimesWithoutPatterns.map((route) => {
    return {
      name: route.trip.routeShortName,
      headsign: route.headsign,
      arrivalDelay: convertTimeToMins(route.arrivalDelay),
      scheduledArrival: convertTime(route.scheduledArrival),
      realtimeArrival: convertTime(route.realtimeArrival),
    };
  });

  return {
    coords,
    stopName,
    routes,
  };
};

export {getRoutesByStopId, getNearestStops};
