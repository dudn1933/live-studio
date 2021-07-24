import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { LiveStudio } from 'src/app/live-studio/live-studio.model';

@Component({
  selector: 'app-respiration-waveform',
  templateUrl: './respiration-waveform.component.html',
  styleUrls: ['./respiration-waveform.component.scss']
})
export class RespirationWaveformComponent implements OnInit {
  @Input() waveData:any;
  @Input() spaceIndex:any;

  respirationData:any[] = new Array(500).fill(undefined);

  test:any;

  constructor() { }

  ngOnInit(): void {
    let arrayCount = 0;
    let newUndefined = 0;
    for(let count = 0; count < this.respirationData.length; count++) {
      this.respirationData[count] = {ts:count, res:undefined};
    }
    this.waveData.subscribe((res:LiveStudio) => {
      if(this.spaceIndex === res.spaceIndex) {
        this.respirationData[arrayCount] = {ts:arrayCount, res:res.data.dp.F1};

        if(arrayCount < 480) {
          for(let k=(arrayCount+1)*newUndefined; k < (arrayCount+20)*newUndefined; k++) {
            this.respirationData[k] = {ts:k, res:undefined};
          }
        }

        arrayCount++;

        if(arrayCount === 499) {
          arrayCount = 0;
          newUndefined = 1;
        }
        this.remove();
        this.respirationChart();
      }
    })
  }

  respirationChart() {
    const respirationSvg = d3.select(`.respirationBox_${this.spaceIndex}`).append('svg').attr('id','respirationSvg');
    const width:any = document.querySelector('#respirationBox')?.clientWidth;
    const height:any = document.querySelector('#respirationBox')?.clientHeight;
    const margin = {top:10, bottom:10};
    respirationSvg.attr('width',`${width}px`).attr('height',`${height}px`);

    const xScale: any = d3.scaleLinear()
      .range([0, width]);
    xScale.domain(d3.extent(this.respirationData, (d: any) => d.ts));
    const yScale: any = d3
      .scaleLinear()
      .range([height-margin.bottom, margin.top]);
    yScale.domain(d3.extent(this.respirationData, (d: any) => d.res));

    const myLine: any = d3
      .line()
      .defined((d: any) => !isNaN(d.res))
      .x((d: any) => xScale(d.ts))
      .y((d: any) => yScale(d.res));

    respirationSvg
      .append('path')
      .datum(this.respirationData.filter(myLine.defined()))
      .attr('class', 'res')
      .attr('fill', 'none')
      .attr('stroke-width', '3px')
      .attr('stroke', 'black')
      .attr('d', myLine);

    respirationSvg
      .append('path')
      .datum(this.respirationData)
      .attr('class', 'res')
      .attr('fill', 'none')
      .attr('stroke-width', '3px')
      .attr('stroke', 'white')
      .attr('d', myLine);
  }
  remove() {
    const respirationDOM: any = document.querySelector(`.respirationBox_${this.spaceIndex}`);
    if(respirationDOM.hasChildNodes()) {
      respirationDOM.removeChild(respirationDOM.firstChild);
    }
  }
}
