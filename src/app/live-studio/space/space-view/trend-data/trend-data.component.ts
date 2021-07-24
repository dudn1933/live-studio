import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-trend-data',
  templateUrl: './trend-data.component.html',
  styleUrls: ['./trend-data.component.scss']
})
export class TrendDataComponent implements OnInit {
  @Input() waveData: any;
  @Input() spaceIndex: any;

  heartRate: any;
  respirationRate: any;
  temperatureRate: any;

  constructor() {}

  ngOnInit(): void {
    this.waveData.subscribe((res: any) => {
      if (res.data.trendData !== undefined) {
        this.heartRate = res.data.trendData.hr;
        this.respirationRate = res.data.trendData.resp;
        this.temperatureRate = res.data.trendData.temp;
        console.log(res.data.trendData)
        this.remove();
        this.drawTrendChart();
      }
    });
  }

  drawTrendChart() {
    const heartSVG = d3.select(`.heart_${this.spaceIndex}`)?.append('svg');
    const heartWidth:any = document.querySelector('#heart-rate')?.clientWidth;
    const heartHeight:any = document.querySelector('#heart-rate')?.clientHeight;
    const respSVG = document.querySelector(`.resp_${this.spaceIndex}`);
    const tempSVG = document.querySelector(`.temp_${this.spaceIndex}`);
    const respWidth:any = document.querySelector('#respiration-rate')?.clientWidth;
    const respHeight: any = document.querySelector('#respiration-rate')?.clientHeight;
    const margin = { top: 10, right: 20, bottom: 10, left: 20 };

    const Hmin = d3.min(this.heartRate, (d: any) => d.min);
    const Hmax = d3.max(this.heartRate, (d: any) => d.max);

    const heart_xScale: any = d3.scaleTime().range([margin.left, heartWidth]);
    heart_xScale.domain([0, 24]);
    const resp_xScale: any = d3.scaleTime().range([margin.left, respWidth]);
    resp_xScale.domain([0, 24]);

    const heart_yScale: any = d3.scaleLinear().range([heartHeight - margin.bottom, margin.top]);
    heart_yScale.domain([Hmin,Hmax]);

    // const heart_xAxis = d3.axisBottom(heart_xScale);
    // const heart_yAxis = d3.axisLeft(heart_yScale).ticks(3);

    // const heartAxis = d3.select('.heartSVG').append('svg').attr('id', 'heartAxis')
    //   .attr('width', '100%').attr('height', '100%');
    
    // heartAxis.append('g').attr('transform', `translate(0,${margin.bottom})`).call(heart_xAxis);
    // heartAxis.append('g').attr('transform', `translate(${margin.left},${margin.bottom})`).call(heart_yAxis);
    const myLine: any = d3
      .line()
      .x((d: any,i:number) => heart_xScale(i))
      .y((d:any) => heart_yScale(d))

    heartSVG.append('rect')
      .datum(this.heartRate)
      .attr('fill', 'none')
      .attr('stroke-width', '2px')
      .attr('stroke', 'blue')
      .attr('d', myLine);
  }

  remove() {
    const heartDOM: any = document.querySelector(`.heart_${this.spaceIndex}`);
    const respDOM:any = document.querySelector(`.resp_${this.spaceIndex}`);
    const tempDOM:any = document.querySelector(`.temp_${this.spaceIndex}`);
    if(heartDOM.hasChildNodes()) {
      heartDOM.removeChild(heartDOM.firstChild);
    }
    if(respDOM.hasChildNodes()) {
      respDOM.removeChild(respDOM.firstChild);
    }
    if(tempDOM.hasChildNodes()) {
      tempDOM.removeChild(tempDOM.firstChild);
    }
  }
}
