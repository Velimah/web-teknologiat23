import {doFetch} from './network';

const apiUrl =
  'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

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

const getQueryForNearestStops = (lat, lon) => {
  return `{
  stopsByRadius(lat: ${lat}, lon: ${lon}, radius: 500, first: 4) {
    edges {
      node {
        stop {
          gtfsId
          name
          lat
          lon
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

const getNearestStops = async (lat, lon) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: getQueryForNearestStops(lat, lon),
  };

  const routeData = await doFetch(apiUrl, false, options);

  return routeData.data.stopsByRadius.edges.map((edge) => {
    return edge.node.stop.gtfsId;
  });
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
    return `${Math.abs(mins)} minuuttia etuajassa`;
  } else if( mins === 0) {
    return `ajallaan`;
  } else {
    return `${mins} minuuttia myöhässä`;
  }
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
