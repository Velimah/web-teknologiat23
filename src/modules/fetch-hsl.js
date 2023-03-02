import {doFetch} from './network';

const apiUrl =
  'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

const searchRadius = 500;
const busStopCount = 6;

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

/**
 * https://digitransit.fi/en/developers/apis/1-routing-api/stops/#query-scheduled-departure-and-arrival-times-of-a-stop
 * e.g. Karanristi stops: 2132208 (Leppävaara direcrion) & 2132207
 * @param lat
 * @param lon
 */

const getQueryForNextRidesByStopId = (lat, lon,) => {
  return `{
  stopsByRadius(lat: ${lat}, lon: ${lon}, radius: ${searchRadius}, first: ${busStopCount}) {
    edges {
      node {
       stop {
      name
      lat
      lon
      vehicleMode
      stoptimesWithoutPatterns (numberOfDepartures: 5) {
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
 *
 * @returns stop route data
 * @param lat
 * @param lon
 */

const getRoutesByStopId = async (lat, lon) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: getQueryForNextRidesByStopId(lat, lon),
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
        arrivalDelay: convertTimeToMins(route.arrivalDelay),
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
};

export {getRoutesByStopId};
