import { Component, Input, OnInit } from '@angular/core';
import { LiveStudio } from 'src/app/live-studio/live-studio.model';
import { SpaceComponent } from '../../space.component';

@Component({
  selector: 'app-trend-data-number',
  templateUrl: './trend-data-number.component.html',
  styleUrls: ['./trend-data-number.component.scss']
})
export class TrendDataNumberComponent implements OnInit {
  @Input() spaceIndex:any;
  constructor(private trendData:SpaceComponent) { }

  temp!:string;
  resp!:number;
  hrMin!:number;
  hrMax!:number;

  ngOnInit(): void {
    this.trendData.bottomTrend.subscribe((res:LiveStudio) => {
      if(this.spaceIndex === res.spaceIndex) {
        this.hrMin = res.data.dp.hr.min;
        this.hrMax = res.data.dp.hr.max;
        res.data.dp.AB !== undefined ? this.temp = this.comma(res.data.dp.AB) : null;
        res.data.dp[93] !== undefined ? this.resp = res.data.dp[93] : null;
      }
    })
  }

  comma(value:number) {
    return value.toString().replace(/(.{2})/g,"$1.");
  }
}
