import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from '../websocket.service';
import { HttpClient } from '@angular/common/http';
import { LiveStudio } from '../live-studio.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiveStudioService {
  liveStudioUrl = 'http://192.168.0.3:5000';

  patientIndex: Subject<any> = new Subject();
  deviceAddress: Subject<any> = new Subject();
  test:Subject<any> = new Subject();

  constructor(private _http: HttpClient) {}

  getGroup() {
    return this._http.get<LiveStudio[]>(this.liveStudioUrl+'/groups').toPromise().then((res:any) => {
      const spaceID= res.data.filter((v:any) => v.name === "AA")[0].spaces;
      return spaceID;
    }).then((groupRes:any) => {
      return this._http.get<LiveStudio[]>(this.liveStudioUrl+'/spaces').toPromise().then((res:any) => {
        const deviceID = res.data.filter((v:any,i:number) => {
            if(v._id === groupRes[i]) {
              this.patientIndex.next(v);
              return v._id;
            };
        });
        return deviceID;
      });
    }).then((spaceRes:any) => {
      return this._http.get<LiveStudio[]>(this.liveStudioUrl+'/devices').toPromise().then((res:any) => {
        const macAddress:any[] = [];
        for(let i=0; i < spaceRes.length; i++) {
          for(let j=0; j < res.data.length; j++) {
            if(spaceRes[i].device === res.data[j]._id) {
              this.deviceAddress.next(res.data[j]);
              macAddress.push(res.data[j]);
            }
          }
        }
        return macAddress;
      });
    })
  }
}