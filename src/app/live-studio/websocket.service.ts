import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket'
import { BehaviorSubject, Observable, Observer, pipe, Subject } from 'rxjs';
import { LoginService } from '../login-service/login.service';
import { map } from 'rxjs/operators';

@Injectable()
export class WebsocketService {
  initSubject: Subject<any> = new Subject();
  tempObservable: Subject<any> = new Subject();
  
  constructor(private loginService: LoginService) {
  }

  getHicardiAddress(devicesInfo:any) {
    this.initSubject = webSocket("ws://192.168.0.3:5000");
    this.initSubject.subscribe(
      (res: any) => {
        if(res.type === "connected") {
          this.initSubject.next({"type":"central-connect","data":{"account": localStorage.getItem("token")}});
        } else if(res.type === "connection-confirmed") {
          const devicesAddress = [...devicesInfo].map(v => v.peripheral.id);
          
          this.initSubject.next({
            "type":"devices-subscription",
            "data":{
                "devices": devicesAddress,
                "account": localStorage.getItem("token")
            }
          });
        } else if (res.type === "data") {
          this.tempObservable.next(res);
          localStorage.removeItem("token");
        }
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }
}
