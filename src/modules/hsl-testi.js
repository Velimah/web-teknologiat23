`{
  stopsByRadius(lat: 60.169, lon: 24.76199, radius: 500, first: 4) {
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
