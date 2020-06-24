import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import CardView from '../CardView';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var updateInterval = 2000;
class DynamicColumnChart extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount(){
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
		var dpsColor,deltaY, yVal;
		var dps = this.chart.options.data[0].dataPoints;
		
		for (var i = 0; i < dps.length; i++) {
			deltaY = Math.round(2 + Math.random() *(-2-2));
			yVal = deltaY + dps[i].y > 0 ? (deltaY + dps[i].y < 100 ? dps[i].y + deltaY : 100) : 0;
			dpsColor = yVal >= 90 ? "#ffcc5e" : yVal >= 70 ? "#ff7387" : yVal >= 50 ? "#26a6b7": yVal >= 30 ? "#26c9b8" :yVal >= 20 ? "#988c85" : "#60d8eb ";
			dps[i] = {label: "Core "+(i+1) , y: yVal, color: dpsColor};
		}
		this.chart.options.data[0].dataPoints = dps;
		this.chart.render();
	}
	render() {
		const options = {
			subtitles: [{
				text: "Intel Core i7 980X @ 3.33GHz",
				fontSize:18
			}],
			axisY: {
				title: "CPU Usage (%)",
				suffix: "%",
			maximum: 100
			},
			axisX: {
				title: "Cores"
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
				type: "column",
				yValueFormatString: "#,###'%'",
				indexLabel: "{y}",
				showInLegend: true,
				name: "Usage %",
				dataPoints: [
					{ label: "Core 1", y: 50 },
					{ label: "Core 2", y: 40 },
					{ label: "Core 3", y: 82 },
					{ label: "Core 4", y: 60 },
					{ label: "Core 5", y: 20 },
					{ label: "Core 6", y: 70 }
				]
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

export default DynamicColumnChart;