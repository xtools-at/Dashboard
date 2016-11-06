import React from 'react';
import * as Redux from 'react-redux';

export var StationsDataList = React.createClass({
  render() {
    var {stations} = this.props.storage;

    var renderStations = () => {
      return stations.map((station, index) => {
        return (
          <option key={index} index={index} data-value={station.id} value={station.name} />
        );
      });
    };

    return (
      <datalist id={this.props.id}>
        {renderStations()}
      </datalist>
    )
  }
});

export default Redux.connect(
  (state) => {
    return state;
  }
)(StationsDataList);
