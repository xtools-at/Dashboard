import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';
import idbRef from 'app/db/idb';

import LastRoutesItem from 'LastRoutesItem';
import Preloader from 'Preloader';

export var LastRoutesList = React.createClass({
  componentDidMount() {
      //fetch lastRoutes from IDB
      var {dispatch} = this.props;
      dispatch(actions.getLastRoutes());
  },

  render() {
    var {lastRoutes} = this.props;
    
    var renderLastRoutes = () => {
      if (lastRoutes.length === 0) {
        return (
          <Preloader />
        );
      }
      //else
      return lastRoutes.map((route, index) => {
        return (
          <LastRoutesItem key={index} index={index} {...route}/>
        );
      });
    };

    return (
      <section id="lastroutes-list" className="row">
        <div className="row">
          {renderLastRoutes()}
        </div>
      </section>
    )
  }
});

export default Redux.connect(
  (state) => {
    return state;
  }
)(LastRoutesList);
