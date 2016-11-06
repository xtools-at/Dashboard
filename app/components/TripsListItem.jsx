import React from 'react';
import * as Redux from 'react-redux';
//import moment from 'moment';

import * as actions from 'actions';

export var TripsListItem = React.createClass({
	render() {

	  	var {duration, interchange, parts} = this.props;

	    return (
		    <div className="">
		     {duration}
		    </div>
	    )
	  }
	});

export default Redux.connect()(TripsListItem);