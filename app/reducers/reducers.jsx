export var storageReducer = (state = {
  userLat: '',
  userLng: '',
  stations: [],
  lines: {}
}, action) => {
  switch (action.type) {
    case 'STORE_LOCATION':
      return {
        ...state,
        userLat : action.userLat,
        userLng : action.userLng
      };
      case 'GET_STATIONS':
        return {
          ...state,
          stations: action.stations
        };
      case 'GET_LINES':
        return {
          ...state,
          lines: action.lines
        };
      case 'SET_SELECTED_STATION':
        return {
          ...state,
          activeStation: action.activeStation
        };
    default:
      return state;
  }
};


export var tripsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_TRIPS':
      return [
        ...action.trips
        ];
    case 'CLEAR_TRIPS':
      return [];
    default:
      return state;
  }
};

export var lastRoutesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_LAST_ROUTES':
      return [
        ...action.lastRoutes
        ];
    default:
      return state;
  }
};
