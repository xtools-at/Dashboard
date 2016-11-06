import React from 'react';
import * as Redux from 'react-redux';

export var StationInformation = React.createClass({
  componentDidMount() {
      //$('h1').focus();  
  },
  render() {

    var {activeStation} = this.props.storage;

    return (
      <section id="station_information" className="card-panel col s12 m10 offset-m1 l5 offset-l1">
        <h1 className="center" tabIndex="-1">
          Requested Station: {activeStation.name}
        </h1>
        <p className="center">{activeStation.subwayStations}</p>

      </section>
    )
  }
});

export default Redux.connect(
  (state) => {
    return state;
  }
)(StationInformation);
