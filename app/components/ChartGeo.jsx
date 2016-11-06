import React from 'react';
import * as Redux from 'react-redux';

import {Chart} from 'react-google-charts'

export var ChartGeo = React.createClass({

	render() {
	  	//var {} = this.props;

	    return (
		    <div className="">
		    	<Chart
			        chartType="GeoChart" 
			        data={[ ['Country', 'Popularity'], ['Germany', 200], ['United States', 300], ['Brazil', 400], ['Canada', 500], ['France', 600], ['RU', 700] ]}
			        options={{}}
			        graph_id="GeoChart"
			        width="100%"
			        height="400px"
			        legend_toggle
			       />
		    </div>
	    )
	  }
	});

export default Redux.connect()(ChartGeo);