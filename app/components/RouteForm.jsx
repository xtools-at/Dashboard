import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';

import StationsDataList from 'StationsDataList';


export var RouteForm = React.createClass({

	onRouteSubmit(ev) {
		ev.preventDefault();
		var {dispatch} = this.props;

		//TODO validate form

		var from, to, fromID, toID, time, dateConv, dateTime, mode;
		from = this.refs.station_from.value;
		to = this.refs.station_to.value;
		fromID = $('#stations_list [value="' + this.refs.station_from.value + '"]').data('value');
		toID = $('#stations_list [value="' + this.refs.station_to.value + '"]').data('value');
		dateTime = this.refs.station_datetime.value;
		dateConv = moment(this.refs.station_datetime.value).format('YYYYMMDD');
		time = moment(this.refs.station_datetime.value).format('hh:mm');
		mode = $('#radio-group input[type="radio"]:checked').val();

		console.log('calling w/ ',fromID,toID,dateConv,time,mode);

		dispatch(actions.setLastRoute({from, fromID, to, toID, dateTime, mode}));
		dispatch(actions.requestRoute(fromID, toID, dateConv, time, mode));
	},

	onOfflineSubmit(ev) {
		ev.preventDefault();
		//TODO validate form

		var from, fromID;
		from = this.refs.station_from.value;
		fromID = $('#stations_list [value="' + this.refs.station_from.value + '"]').data('value');

		var {dispatch} = this.props;
		dispatch(actions.setActiveStation(fromID, this.props.storage.stations));

		console.log('onOfflineSubmit');
	},

	render() {

		var {lastRoutes} = this.props;
		var route = false;
		if (lastRoutes.length > 0){
			route = lastRoutes[0];
		}
		//TODO: defaultValues are not shown
		//console.log('route 4 form: ', route);
		
		function renderForm(that) {
			var output = '';
			if (navigator.onLine) {    // do things that need connection
				output = (
					<div>
						<div className="input-field col s12 m8 offset-m2 l8 offset-l2">
						  <input type="text" 
							list="stations_list" 
							id="station_from" 
							ref="station_from" 
							placeholder="Westbahnhof" 
							defaultValue={route ? route.from : ''} 
							className="validate" 
							autoFocus="true" 
							autoComplete="from" 
							name="from" 
							required/>
						  <label htmlFor="station_from" className="active" data-error="Please enter a Departure Station">Departure Station</label>
					  </div>
						<div className="input-field col s12 m8 offset-m2 l8 offset-l2">
						  <input type="text" 
							list="stations_list" 
							id="station_to" 
							ref="station_to" 
							placeholder="Hauptbahnhof" 
							defaultValue={route ? route.to : ''} 
							className="validate" 
							autoComplete="to" 
							name="to" 
							required/>
						  <label htmlFor="station_to" className="active" data-error="Please enter an Arrival Station">Arrival Station</label>
					  </div>

					  <div className="clearfix"></div>

					  <div className="col s12 m8 offset-m2 l8 offset-l2">
						  <div className="row input-row">
							  <div className="input-field col s8">
								  <input type="datetime-local" 
									id="station_datetime" 
									ref="station_datetime" 
									defaultValue={route && route.mode == 'arr' ? moment(route.dateTime).format('YYYY-MM-DDTHH:mm') : moment().format('YYYY-MM-DDTHH:mm')} 
									className="validate" 
									autoComplete="date" 
									name="date" 
									required/>
								  <label htmlFor="station_datetime" className="active" data-error="Please enter Date and Time">Date and Time</label>
							  </div>
							  <div className="col s4" id="radio-group">
									<input className="validate" defaultChecked name="arrival_or_departure" type="radio" id="radio_dep" value="dep" required />
									<label className="" htmlFor="radio_dep" data-error="Please select wether you want to depart or arrive on entered time">Departure</label>

									<input name="arrival_or_departure" type="radio" id="radio_arr" value="arr" />
									<label className="" htmlFor="radio_arr">Arrival</label>
								</div>
						  </div>
					  </div>

					  <div className="clearfix"></div>
					  
						<div className="row center">
							<button className="waves-effect btn btn-large" onClick={that.onRouteSubmit}>
								<i className="material-icons left">subway</i>Get me there!
							</button>
						</div>
						<StationsDataList id="stations_list" />
					</div>
				);
			
			} else {

				output = (
					<div>
						<div className="input-field col s12 m8 offset-m2 l8 offset-l2">
						  <input type="text" 
							list="stations_list" 
							id="station_from" 
							ref="station_from" 
							placeholder="Westbahnhof" 
							defaultValue={route ? route.from : ''} 
							className="validate" 
							autoFocus="true" 
							autoComplete="from" 
							name="from" 
							required/>
						  <label htmlFor="station_from" className="active" data-error="Please enter a Departure Station">Departure Station</label>
					  </div>

					  <div className="clearfix"></div>
					  

						<div className="row center">
							<button className="waves-effect btn btn-large" onClick={that.onOfflineSubmit}>
								<i className="material-icons left">subway</i>Show Timetables
							</button>
						</div>
						<StationsDataList id="stations_list" />
					</div>
				);
			}

			return output;
		}

		return (
			<form id="route-form" autoComplete="on" className="row">
			{ renderForm(this) }
			</form>
		);
	}
});

export default Redux.connect(
	(state) => {
		return state;
	}
)(RouteForm);
