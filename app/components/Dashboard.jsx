import React from 'react';
import * as Redux from 'react-redux';


import RouteForm from 'RouteForm';
import LastRoutesList from 'LastRoutesList';


export var Dashboard = React.createClass({
	componentDidMount() {
			//$('h1').focus();  
	},

	render() {

		var offlineBar;
		if (navigator.onLine) {
			offlineBar = '';
		} else {
			offlineBar = (
				<section id="offline-msg" className="card-panel amber lighten-3">
					<div className="valign-wrapper col s12 m10 offset-m1 l5 offset-l1">
						<i className="material-icons left">flash_on</i>
						{'You are offline - Functionality is limited (but hey, it\'s there!)'}
					</div>
					<div className="clearfix"></div>
				</section>
			);
		}

		return (
				<div id="dashboard" >
					{offlineBar}
					<section className="card-panel col s12 m10 offset-m1 l5 offset-l1">
						<h1 className="center">Need a Ride?</h1>
						<p className="center">Travel Vienna by Subway the easy way</p>
						<RouteForm />
					</section>
					<section className="card-panel col s12 m10 offset-m1 l4 offset-l1">
						<h2 className="center">Recently requested:</h2>
		        		<p className="center">some subtitle</p>
		        		<LastRoutesList />
					</section>
				</div>
		)
	}
});

export default Redux.connect(
	(state) => {
		return state;
	}
)(Dashboard);
