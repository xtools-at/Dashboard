import moment from 'moment';
import axios from 'axios';
var {hashHistory} = require('react-router');
import Helper from 'Helper';

//import firebase, {dbRef} from 'app/firebase/';
import idbRef from 'app/db/idb';



//Store custom Data
export var storeLocation = (lat, lng) => {
	return {
		type: 'STORE_LOCATION',
		userLat: lat,
		userLng: lng
	};
};

//Request Route
export var requestRoute = (from, to, date, time, arrOrDep) => {
	//from, to: Station ID Strings
	//date: String, format YYYYMMDD
	//time: String, format HH:MM
	//arrOrDep: "arr" | "dep"

	return (dispatch) => {
		//base url
		var url = "http://www.wienerlinien.at/ogd_routing/XML_TRIP_REQUEST2?locationServerActive=1&ptOptionsActive=1&outputFormat=JSON";
		url += `&type_origin=stop&name_origin=${encodeURIComponent(from)}&type_destination=stop&name_destination=${encodeURIComponent(to)}&itdDate=${date}&itdTime=${time}&itdTripDateTimeDepArr=${arrOrDep}`;
		//number of routes calculated
		url += "&calcNumberOfTrips=5";
		//coords settings
		//url += "&coordListOutputFormat=list&coordOutputFormat=WGS84";
		//excluding everything but subway (would be ID 2)
		url += "&excludedMeans=0&excludedMeans=1&excludedMeans=3&excludedMeans=4&excludedMeans=5&excludedMeans=6&excludedMeans=7&excludedMeans=8&excludedMeans=9&excludedMeans=10&excludedMeans=11";
		
		//var base64Url = btoa(url);
		var apiUrl = "https://uncors.herokuapp.com/api?url="+encodeURIComponent(url);

		console.log('apiUrls',url,apiUrl);

		return axios.get(apiUrl).then((res) => {
			console.log('api response: ',res.data);
			if (res.data){
				try{

					var tripsArray = [];

					for (var i = 0; i < res.data.trips.length; i++) {
						var trip = res.data.trips[i];
						var tripObj = {};

						//console.log(trip);
						//console.log(trip.trip);

						//make liefe easier - data structure: {trips: [ { trip: {...obj} },   { trip: {...obj} }  ]}
						trip = trip.trip;

						tripObj['duration'] = trip.duration;
						tripObj['interchange'] = trip.interchange;

						//easy access to all used lines
						var linesArray = [];

						//get the parts of the route
						var partsArray = [];
						for (var ip = 0; ip < trip.legs.length; ip++) {
							var part = trip.legs[ip];

							var partObj = {};
							
							//easy access to all used lines
							linesArray.push(part.mode.number);

							partObj['line'] = part.mode.number;
							partObj['lineTo'] = part.mode.destination;
							partObj['depTime'] = part.points[0].dateTime.time;
							partObj['arrTime'] = part.points[1].dateTime.time;

							//station sequence the train passes
							var sequenceArray = [];
							for (var is = 0; is < part.stopSeq.length; is++) {
								sequenceArray.push(part.stopSeq[is].nameWO);
							}
							partObj['stops'] = sequenceArray;


							partsArray.push(partObj);
						}


						tripObj['parts'] = partsArray;
						//easy access to all used lines
						tripObj['lines'] = linesArray;

						//high-level departure is easy...
						tripObj['depStation'] = tripObj.parts[0].stops[0];
						tripObj['depTime'] = tripObj.parts[0].depTime;
						//...arrival more tricky
						var partsLength = tripObj.parts.length -1;
						var lastStopsLength = tripObj.parts[partsLength].stops.length -1;
						tripObj['arrStation'] = tripObj.parts[partsLength].stops[lastStopsLength];
						tripObj['arrTime'] = tripObj.parts[partsLength].depTime;
						

						console.log('tripObj',tripObj);
						tripsArray.push(tripObj);

					}


					console.log('tripsArray',tripsArray);
					dispatch({
						type: 'GET_TRIPS',
						trips: tripsArray
					});
					hashHistory.push('/trips');

				} catch (e){
					console.log(e);
				}
			}
		});
	}
}

//Get recent Routes
export var getLastRoutes = () => {
	return (dispatch) => {
		return idbRef.get('lastRoutes').then((lastRoutes) => {
			dispatch(dispatchLastRoutes(lastRoutes));
		});
	}
}
var dispatchLastRoutes = (array) => {
	if (typeof array == 'undefined' || array.length <= 0){
		return {
			type: 'GET_LAST_ROUTES',
			lastRoutes: []
		};
	}
	return {
		type: 'GET_LAST_ROUTES',
		lastRoutes: array
	};
}


//Set recent Route
export var setLastRoute = (routeObj) => {
	return (dispatch) => {
		return idbRef.get('lastRoutes').then((storedRoutes) => {

			if (typeof storedRoutes == 'undefined' || storedRoutes.length <= 0){
				storedRoutes = [
					routeObj
				];
			} else {
				//there are objects stored!

				if (storedRoutes.length > 9){
					//we want 10 entries max
					storedRoutes.pop();
				}
				//insert new route on top of array
				storedRoutes.splice(0, 0, routeObj);
			}

			//console.log('routeArray: ',storedRoutes);
			
			//store it
			idbRef.set('lastRoutes', storedRoutes);
			
			//refresh view
			getLastRoutes();

			return;
		});
	}
}

//Fetch Stations
export var getStations = () => {
	return (dispatch) => {
		return axios.get('/data/stations.json').then((res) => {
			if (res.data) {
				dispatch(dispatchGetStations(res.data));
			}
		});
	}
}

var dispatchGetStations = (array) => {
	if (typeof array == 'undefined' || array.length <= 0){
		return {
			type: 'GET_STATIONS',
			stations: []
		};
	}
	return {
		type: 'GET_STATIONS',
		stations: array
	};
}


//Fetch Lines
export var getLines = () => {
	return (dispatch) => {
		return axios.get('/data/lines.json').then((res) => {
			if (res.data) {
				dispatch(dispatchGetLines(res.data));
			}
		});
	}
}

var dispatchGetLines = (obj) => {
	if (typeof obj == 'undefined'){
		return {
			type: 'GET_LINES',
			lines: {}
		};
	}
	return {
		type: 'GET_LINES',
		lines: obj
	};
}

//Set active Station for offline View
export var setActiveStation = (stationId, allStationsArray) => {
	var activeStation = {};

	allStationsArray.map((station, index) => {
		if (station.id == stationId) {
			//found it!
			activeStation = station;
		}
    });
	hashHistory.push('/station');
    return {
		type: 'SET_SELECTED_STATION',
		activeStation
	};

}
