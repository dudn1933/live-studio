import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { LiveStudioService } from './live-studio-service/live-studio.service';
import { WebsocketService } from './websocket.service';


@Component({
  selector: 'app-live-studio',
  templateUrl: './live-studio.component.html',
  styleUrls: ['./live-studio.component.scss']
})
export class LiveStudioComponent implements OnInit {

  dateTime!: Observable<Date>;
  spaceNumber: number[] = [0,1,2,3,4,5,6,7];
  devicesData!: Observable<any>;

  constructor(private livestudioService: LiveStudioService, private websocketService: WebsocketService) {
    this.livestudioService.getGroup().then(res => {
      this.websocketService.getHicardiAddress(res)
    })
  }

  ngOnInit(): void {
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    )
  }
}