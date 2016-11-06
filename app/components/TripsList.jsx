import React from 'react';
import * as Redux from 'react-redux';

import TripsListItem from 'TripsListItem';
import Preloader from 'Preloader';

export var TripsList = React.createClass({
  componentDidMount() {
      //$('h1').focus();  
  },
  render() {
    var {trips} = this.props;
    
    var renderTrips = () => {
      if (trips.length === 0) {
        return (
          <Preloader />
        );
      }
      //else
      return trips.map((trip, index) => {
        return (
          <TripsListItem key={index} index={index} {...trip}/>
        );
      });
    };

    return (
      <section id="trips-list" className="card-panel col s12 m10 offset-m1 l5 offset-l1">
        <h1 className="center" tabIndex="-1">Your requested Trip</h1>
        <p className="center">some subtitle</p>
        {renderTrips()}
      </section>
    )
  }
});

export default Redux.connect(
  (state) => {
    return state;
  }
)(TripsList);
