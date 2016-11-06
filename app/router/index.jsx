import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Main from 'Main';
import Dashboard from 'Dashboard';
import TripsList from 'TripsList';
import StationInformation from 'StationInformation';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Dashboard}/>
      <Route path="trips" component={TripsList} />
      <Route path="station" component={StationInformation} />
    </Route>
  </Router>
);
