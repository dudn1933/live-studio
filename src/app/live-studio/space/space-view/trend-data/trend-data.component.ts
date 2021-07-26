import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-trend-data',
  templateUrl: './trend-data.component.html',
  styleUrls: ['./trend-data.component.scss']
})
export class TrendDataComponent implements OnInit {
  @Input() waveData: any;
  @Input() spaceIndex: any;

  heartRateBPM: number = 0;

  heartRate: any;
  respirationRate: any;
  temperatureRate: any;

  constructor() {}

  ngOnInit(): void {
    this.waveData.subscribe((res: any) => {
      res.data.dp[92] !== undefined ? this.heartRateBPM = res.data.dp[92] : null;
      if (res.data.trendData !== undefined) {
        this.heartRate = res.data.trendData.hr;
        this.respirationRate = res.data.trendData.resp;
        this.temperatureRate = res.data.trendData.temp;
        if (res.data.trendData.hr.length > 48) {
          while (this.heartRate.length !== 48) {
            this.heartRate.shift();
            this.respirationRate.shift();
            this.temperatureRate.shift();
          }
        }
        this.remove();
        this.drawHeartRateTrendChart();
        this.drawRespirationRateTrendChart();
      }
    });
  }

  drawHeartRateTrendChart() {
    const heartSVG = d3.select(`.heart_${this.spaceIndex}`).append('svg').attr('id','heartSVG');
    heartSVG.style('position', 'absolute').style('box-sizing','border-box').attr('width', '100%').attr('height', '100%');
    const width:any = document.querySelector('#heartSVG')?.clientWidth;
    const height:any = document.querySelector('#heartSVG')?.clientHeight;
    const margin = { top: 25, right: 20, bottom: 20, left: 25 };

    const Hmin = d3.min(this.heartRate, (d: any) => d.min);
    const Hmax = d3.max(this.heartRate, (d: any) => d.max);

    const xLabel = (start:any) => {
      const first = Math.floor(((start.index * 15) / 60));
      const last = Math.floor((((start.index + 48) * 15) / 60));
      return [first, last]
    }

    const heart_xScale: any = d3.scaleLinear().range([margin.left, width-margin.left]);
    heart_xScale.domain(xLabel(this.heartRate[0])).nice();

    const heart_yScale: any = d3.scaleLinear().range([height-margin.bottom, margin.top]);
    heart_yScale.domain([Hmin,Hmax]).nice();

    const heart_xAxis:any = d3.axisBottom(heart_xScale).ticks(12);
    heart_xAxis.tickFormat((d: any, i: number) => d > 24 ? d = d - 24 : d);
    const heart_yAxis = d3.axisLeft(heart_yScale).ticks(2);

    const heartAxis = d3.select(`.heart_axis${this.spaceIndex}`).append('svg').attr('width', width).attr('height', height).style('position','absolute');
    
    heartAxis.append('g').attr('width','100%').style('font-size', '.5rem').attr('stroke', 'grey').attr('transform', `translate(0,${height-margin.bottom})`).call(heart_xAxis).selectChildren('g').attr('stroke', 'grey').selectChild('line').attr('stroke', 'transparent')
    heartAxis.append('g').attr('stroke', 'grey').attr('transform', `translate(${margin.left},0)`).call(heart_yAxis).selectChildren('g').attr('stroke', 'grey').selectChild('line').attr('stroke', 'transparent');
    heartAxis.selectAll('path').attr('stroke','black')
    
    heartSVG.selectAll('circle')
      .data(this.heartRate)
      .enter().append('circle')
      .attr('fill', 'red')
      .attr('r','2px')
      .attr('cx', (d:any,i) => heart_xScale((Math.floor(this.heartRate[0].index+i)*15)/60))
      .attr('cy', (d: any) => heart_yScale(d.avg))

    heartSVG.selectAll('rect')
      .data(this.heartRate)
      .enter().append('rect')
      .attr('fill', 'grey')
      .attr('fill-opacity', '0.5')
      .attr('width', '1px')
      .attr('height', (d: any) => {
        if (d.max-d.min !== 0) {
          return height-margin.top-margin.bottom
        } else {
          return '0%'
        }
      })
      .attr('x', (d:any,i) => heart_xScale((Math.floor(this.heartRate[0].index+i)*15)/60))
      .attr('y', (d:any) => margin.bottom);
  }

  drawRespirationRateTrendChart() {
    const respSVG = d3.select(`.respiration_${this.spaceIndex}`).append('svg').attr('id','respSVG');
    respSVG.style('position', 'absolute').style('box-sizing','border-box').attr('width', '100%').attr('height', '100%');
    const width: any = document.querySelector('#respSVG')?.clientWidth;
    const height: any = document.querySelector('#respSVG')?.clientHeight;
    const margin = { top: 25, right: 20, bottom: 20, left: 25 };

    const Rmin = d3.min(this.respirationRate, (d: any) => d.min);
    const Rmax = d3.max(this.respirationRate, (d: any) => d.max);

    const xLabel = (start:any) => {
      const first = Math.floor(((start.index * 15) / 60));
      const last = Math.floor((((start.index + 48) * 15) / 60));
      return [first, last]
    }

    const respiration_xScale: any = d3.scaleLinear().range([margin.left, width-margin.left]);
    respiration_xScale.domain(xLabel(this.respirationRate[0])).nice();

    const respiration_yScale: any = d3.scaleLinear().range([height-margin.bottom, margin.top]);
    respiration_yScale.domain([Rmin, Rmax]).nice();
    
    const respiration_xAxis:any = d3.axisBottom(respiration_xScale).ticks(12);
    respiration_xAxis.tickFormat((d: any, i: number) => d > 24 ? d = d - 24 : d);
    const respiration_yAxis = d3.axisLeft(respiration_yScale).ticks(2);

    const respirationAxis = d3.select(`.respiration_axis${this.spaceIndex}`).append('svg').attr('width', width).attr('height', height).style('position','absolute');
    
    respirationAxis.append('g').attr('width','100%').style('font-size', '.5rem').attr('stroke', 'grey').attr('transform', `translate(0,${height-margin.bottom})`).call(respiration_xAxis).selectChildren('g').attr('stroke', 'grey').selectChild('line').attr('stroke', 'transparent')
    respirationAxis.append('g').attr('stroke', 'grey').attr('transform', `translate(${margin.left},0)`).call(respiration_yAxis).selectChildren('g').attr('stroke', 'grey').selectChild('line').attr('stroke', 'transparent');
    respirationAxis.selectAll('path').attr('stroke', 'black')
    
    respSVG.selectAll('circle')
      .data(this.heartRate)
      .enter().append('circle')
      .attr('fill', 'red')
      .attr('r','2px')
      .attr('cx', (d:any,i) => respiration_xScale((Math.floor(this.respirationRate[0].index+i)*15)/60))
      .attr('cy', (d: any) => respiration_yScale(d.avg))

    respSVG.selectAll('rect')
      .data(this.respirationRate)
      .enter().append('rect')
      .attr('fill', 'grey')
      .attr('fill-opacity', '0.5')
      .attr('width', '1px')
      .attr('height', (d: any) => {
        if (d.max-d.min !== 0) {
          return height-margin.top-margin.bottom
        } else {
          return '0%'
        }
      })
      .attr('x', (d:any,i) => respiration_xScale((Math.floor(this.heartRate[0].index+i)*15)/60))
      .attr('y', (d:any) => margin.bottom);
  }

  remove() {
    const heartDOM: any = document.querySelector(`.heart_${this.spaceIndex}`);
    const heartAxis: any = document.querySelector(`.heart_axis${this.spaceIndex}`);
    const respDOM: any = document.querySelector(`.respiration_${this.spaceIndex}`);
    const resPAxis: any = document.querySelector(`.respiration_axis${this.spaceIndex}`);
    if(heartDOM.hasChildNodes()) {
      heartDOM.removeChild(heartDOM.firstChild);
    }
    if(heartAxis.hasChildNodes()) {
      heartAxis.removeChild(heartAxis.firstChild);
    }
    if (respDOM.hasChildNodes()) {
      console.log(1)
      respDOM.removeChild(respDOM.firstChild);
    }
    if (resPAxis.hasChildNodes()) {
      console.log(2)
      resPAxis.removeChild(resPAxis.firstChild);
    }
  }
}
