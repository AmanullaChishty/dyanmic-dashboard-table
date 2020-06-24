import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import CardView from '../CardView';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = [{x: 1955, y: 10}, {x: 1956, y: 13}, {x: 1957, y: 18}, {x: 1958, y: 20}, {x: 1959, y: 17},{x: 1960, y: 10}, {x: 1961, y: 13}, {x: 1962, y: 18}, {x: 1963, y: 20}, {x: 1964, y: 17}];   //dataPoints.
var xVal = 1965;
var yVal = 15;
var updateInterval = 5000;

class DynamicLineChart extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount() {
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		dps.push({x: xVal,y: yVal});
		xVal++;
		if (dps.length >  10 ) {
			dps.shift();
		}
		this.chart.render();
	}
	render() {
		const options = {
			subtitles: [{
				text: "Revenue for the financial Year",
				fontSize:18
			}],
			axisX: {
				title: "Year",
			},
			axisY: {
				title: "Revenue (%)",
				suffix: "%",
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor:"pointer",
				horizontalAlign: "bottom",
				fontSize: 12,
				fontColor: "dimGrey",
			},
			data: [{
				type: "area",
				yValueFormatString: "#,###'%'",
				indexLabel: "{y}",
				markerSize: 15,
				color:'#ffcc5e',
				lineColor:"#988c85",
				lineThickness: 4,
				dataPoints : dps,
				showInLegend: true,
				name: "Revenue %",
			}]
		}
		
		return (
			<CardView>
				<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
				/>
			</CardView>
		);
	}
}

export default DynamicLineChart;