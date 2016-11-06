import * as redux from 'redux';
import thunk from 'redux-thunk';

import { tripsReducer, lastRoutesReducer, storageReducer } from 'reducers'

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    storage: storageReducer,
    trips: tripsReducer,
    lastRoutes: lastRoutesReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
