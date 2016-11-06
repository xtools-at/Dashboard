import React from 'react';
import * as Redux from 'react-redux';
import {Chart} from 'react-google-charts';


export var Dashboard = React.createClass({
	componentDidMount() {
			//$('h1').focus();  
	},

	render() {

		return (
				<div id="dashboard" >
					<section className="col s12 m12 l12">
						<div className="card-panel row">
							<Chart
						        chartType="GeoChart" 
						        data={[
						        	['City', 'Employees'], 
						        	['Vienna', 12], 
						        	['Belgrade', 8], 
						        	['Doboj', 4], 
						        	['Budapest', 3],
						        	['Szombathely', 2],
						        	['Veszprém', 1],
						        	['Celje', 1],
						        	['Zagreb', 2],
						        ]}
						        options={{ 
						        	region: '150', 
						        	displayMode: 'markers', 
						        	colorAxis: {colors: ['#ffab91', '#b0120a']} 
						        }}
						        width="100%"
						        height="calc(100vh - 120px)"
						     />
					     </div>
					</section>

					<section className="col s12 m6 l6">
						<div className="card-panel row">
							<Chart
						        chartType="BarChart" 
						        data={[ 
						        	['Month', 'Opened Issues', 'Closed Issues'],
						        	['July', 601, 720],['August', 99, 388],
						        	['September', 385, 267],
						        	['October', 423, 925] 
						        ]}
						        options={{ 
						        	bars: 'horizontal', 
						        	colors: ['#b0120a', '#ffab91'], 
						        	hAxis: { 
							        	title: 'Total Issues', 
							        	minValue: 0, 
							        	textStyle: { bold: true, fontSize: 12, color: '#4d4d4d' }, 
							        	titleTextStyle: { bold: true, fontSize: 12, color: '#4d4d4d' }
							        }, 
						        	vAxis: { 
						        		title: 'Month', 
						        		textStyle: { fontSize: 12, bold: true, color: '#848484' }, 
						        		titleTextStyle: { fontSize: 12, bold: true, color: '#848484' } 
						        	}
						        }}
						        width="100%"
						        chartPackages={['corechart', 'bar']}
						        height="400px"
						     />
						</div>
					</section>

					<section className="col s12 m6 l6">
						<div className="card-panel row">
							<div className="col s12 center">
								<h3>Open Issues</h3>
							</div>
							<div className="col s6 m6 l6 center">
								
								<Chart
							        chartType="Gauge" 
							        data={[ ['Label', 'Value'], ['Today', 7] ]}
							        options={{ redFrom: 30, redTo: 50, yellowFrom:20, yellowTo: 30, greenFrom: 0, greenTo: 5, minorTicks: 5, max: 50}}
							        width="100%"
							        height="300px"
							     />
						     </div>
						     <div className="col s6 m6 l6 center">
								<Chart
							        chartType="Gauge" 
							        data={[ 
							        	['Label', 'Value'], 
							        	['Total', 42] 
							        ]}
							        options={{ 
							        	redFrom: 80, 
							        	redTo: 100, 
							        	yellowFrom:60, 
							        	yellowTo: 80, 
							        	greenFrom: 0, 
							        	greenTo: 25, 
							        	minorTicks: 5
							        }}
							        width="100%"
							        height="300px"
							     />
						     </div>
						</div>
					</section>

					<section className="col s12 m6 l6">
						<div className="card-panel row">
							<Chart
						        chartType="LineChart" 
						        columns={[
						        	{"label":"Month","type":"date"},
						        	{"label":"Active Customers","type":"number"},
						        	{"label":"Billed Hours","type":"number"}
						        ]}
						        rows={[
							        [new Date(2016, 6), 10, 1650],
							        [new Date(2016, 7), 9, 820],
							        [new Date(2016, 8),  12, 634],
							        [new Date(2016, 9),  13,  1999],
							        [new Date(2016, 10), 11,  1082],
							        [new Date(2016, 11), 14,  1254]
						        ]}
						        options={{
						        	colors: ['#b0120a', '#ffab91'], 
						        	"legend":true,
						        	//"hAxis":{"title":"Time"},
						        	//"vAxis":{"title":"Air Passengers"}
						        	"series": {
										0: {targetAxisIndex: 0},
							          	1: {targetAxisIndex: 1}
							        },
							        "vAxes": {
							          0: {title: 'Active Customers'},
							          1: {title: 'Billed Hours'}
							        }
						        }}
						        width="100%"
						        height="400px"
						     />
						</div>
					</section>

					<div className="clearfix"></div>
				</div>
		)
	}
});

export default Redux.connect(
	(state) => {
		return state;
	}
)(Dashboard);
