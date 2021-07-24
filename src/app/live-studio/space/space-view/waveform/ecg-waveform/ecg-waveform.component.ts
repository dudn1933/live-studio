import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { LiveStudio } from '../../../../live-studio.model';

import * as d3 from 'd3';

@Component({
  selector: 'app-ecg-waveform',
  templateUrl: './ecg-waveform.component.html',
  styleUrls: ['./ecg-waveform.component.scss']
})
export class EcgWaveformComponent implements OnInit {
  @Input() waveData:any;
  @Input() spaceIndex:any;

  ecgData:any[] = new Array(500).fill(0);
  ecgRate!:number;

  constructor() { }

  ngOnInit(): void {
    let i = 0;
    let newUndefined = 0;
    for(let count=0; count< this.ecgData.length; count++) {
      this.ecgData[count] = {ts:count, ecg:undefined};
    }
    this.waveData.subscribe((res: LiveStudio) => {
      res.data.dp[92] !== undefined ? this.ecgRate = res.data.dp[92] : null;
      const ecgArray = [];
      if(this.spaceIndex === res.spaceIndex) {
        for(let j=i*5; j<i*5+5; j++) {
          for(let count=0; count<res.data.dp.ecg.length; count++) {
            ecgArray.push(res.data.dp.ecg[count])
          }
          this.ecgData[j] = {ts:j, ecg:ecgArray[j%5]};

          if(j<480) {
            for(let k=(j+1)*newUndefined; k<(j+20)*newUndefined; k++) {
              this.ecgData[k] = {ts:k, ecg:undefined};
            }
          }
          this.remove();
          this.ecgChart();
        }
        i++;
        if(i === 99) {
          i=0;
          newUndefined = 1;
        }
      }
    });
  }

  ecgChart() {
    const ecgSvg = d3.select(`.ecgBox_${this.spaceIndex}`).append('svg').attr('id','ecgSvg');
    const width:any = document.querySelector('#chartBox')?.clientWidth;
    const height:any = document.querySelector('#chartBox')?.clientHeight;
    const margin = {top:10, bottom:10};
    ecgSvg.attr('width',`${width}px`).attr('height',`${height}px`);

    const xScale: any = d3.scaleLinear()
      .range([0, width]);
    xScale.domain(d3.extent(this.ecgData, (d: any) => d.ts));
    const yScale: any = d3
      .scaleLinear()
      .range([height-margin.bottom, margin.top]);
    yScale.domain(d3.extent(this.ecgData, (d: any) => d.ecg));

    const myLine: any = d3
      .line()
      .defined((d: any) => !isNaN(d.ecg))
      .x((d: any) => xScale(d.ts))
      .y((d: any) => yScale(d.ecg));

    ecgSvg
      .append('path')
      .datum(this.ecgData.filter(myLine.defined()))
      .attr('class', 'ecg')
      .attr('fill', 'none')
      .attr('stroke-width', '2px')
      .attr('stroke', 'black')
      .attr('d', myLine);

    ecgSvg
      .append('path')
      .datum(this.ecgData)
      .attr('class', 'ecg')
      .attr('fill', 'none')
      .attr('stroke-width', '2px')
      .attr('stroke', 'green')
      .attr('d', myLine);
  }

  remove() {
    const ecgDOM: any = document.querySelector(`.ecgBox_${this.spaceIndex}`);
    if(ecgDOM.hasChildNodes()) {
      ecgDOM.removeChild(ecgDOM.firstChild);
    }
  }
}
