import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import CardView from '../CardView';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints1 = [];
var dataPoints2 = [];
var updateInterval = 3000;
//initial values
var yValue1 = 408;
var yValue2 = 350;
var xValue = 5;
class DynamicMultiSeriesChart extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);		
	}
	componentDidMount(){
		this.updateChart(20);
		setInterval(this.updateChart, updateInterval);
	}
	
	updateChart(count) {
		count = count || 1;		
		for (var i = 0; i < count; i++) {
			xValue += 2;
			yValue1 = Math.floor(Math.random()*(408-400+1)+400);
			yValue2 = Math.floor(Math.random()*(350-340+1)+340);
			dataPoints1.push({
			  x: xValue,
			  y: yValue1
			  
			});
			dataPoints2.push({
			  x: xValue,
			  y: yValue2
			  
			});
		}
		this.chart.options.data[0].legendText = " Bugatti Veyron - " + yValue1 + " km/h";
		this.chart.options.data[1].legendText = " Lamborghini Aventador - " + yValue2 + " km/h";
		this.chart.render();
	}
	render() {
		const options = {
			zoomEnabled: true,
			subtitles: [{
				text: "Speed of Cars",
				fontSize:18
			}],
			axisX: {
				suffix: "secs",
				title: "Time in seconds"
			},
			axisY:{
				suffix: " km/h",
				title: "Speed in (Km/h)",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor:"pointer",
				horizontalAlign: "bottom",
				fontSize: 12,
				fontColor: "dimGrey",
				itemclick : (e)=>{
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					}
					else {
						e.dataSeries.visible = true;
					}
					e.chart.render();
				}
			},
			data: [
				{
					type: "stepLine",
					color:"#26c9b8",
					lineColor:'#ffcc5e',
					markerSize: 10,
					lineThickness: 4,
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Bugatti Veyron",
					dataPoints: dataPoints1
				},
				{
					type: "stepLine",
					color:"#988c85",
					markerSize: 10,
					lineThickness: 4,
					lineColor:'#ff7387', 
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Lamborghini Aventador" ,
					dataPoints: dataPoints2
				}
			]
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


export default DynamicMultiSeriesChart;