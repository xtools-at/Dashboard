import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';

export var LastRoutesItem = React.createClass({
	onItemClick(ev) {
		var {dispatch, fromID, toID, dateTime, mode} = this.props;

		var dateConv, time;
		dateConv = moment(dateTime).format('YYYYMMDD');
		time = moment(dateTime).format('hh:mm');
		
		dispatch(actions.requestRoute(fromID, toID, dateConv, time, mode));
	},

	render() {
	  	var {from, to, dateTime, mode} = this.props;

	    return (
		    <div className="card-panel" onClick={this.onItemClick}>
		     {'From '+from+' to '+to}
		    </div>
	    )
	  }
	});

export default Redux.connect()(LastRoutesItem);