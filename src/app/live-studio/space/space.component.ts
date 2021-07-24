import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LiveStudioService } from '../live-studio-service/live-studio.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
  @Input() spaceIndex!:number;

  hicardiName!:string;
  groupSpace!:string;
  waveData: Subject<any>  = new Subject();
  bottomTrend: Subject<any> = new Subject();
  arrhythmia: Subject<any> = new Subject();

  constructor(private liveStudioService: LiveStudioService, private websocketService: WebsocketService) {
    this.liveStudioService.patientIndex
      .pipe(filter((item:any) => this.spaceIndex === item.index))
      .subscribe((indexData:any) => {
        this.liveStudioService.deviceAddress.pipe(filter((data:any) => indexData.device === data._id))
        .subscribe((InfoData:any) => {
            this.hicardiName = InfoData.peripheral.name;
            this.groupSpace = `A-${this.spaceIndex}`;
            // webSocket에서 오는 데이터를 처리하기.
            this.websocketService.tempObservable.pipe(filter((spaceData:any) => InfoData.peripheral.id === spaceData.data.dv))
              .subscribe((res: any) => {
              this.waveData.next({spaceIndex:this.spaceIndex, data: res.data});
              this.bottomTrend.next({ spaceIndex: this.spaceIndex, data: res.data });
              this.liveStudioService.test.next({ spaceIndex: this.spaceIndex, data: res.data });
            })
        })
    })
  }
  ngOnInit(): void {}
}
