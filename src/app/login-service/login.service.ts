import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login.model'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  loginUrl = 'http://192.168.0.3:5000/accounts/signin';
  login$!:Login[];
  user$: BehaviorSubject<any>;
  private _password: string = '';
  private _id: string = '';
  private _accountID: string = '';

  constructor(private _http: HttpClient, private router:Router) {
    this.user$ = new BehaviorSubject<any>({});
  }

  getInput() {
    return this._http.post<Login[]>(this.loginUrl,{"accountID":this._id, "password":this._password},{'headers':{'Content-type': 'application/json'}}).pipe(map((data) => {
      return data;
    }))
  }

  getID(ID:any) {
    this._accountID = String(ID);
  }

  setID() {
    return this._accountID;
  }

  getInfo(ID:string, password:string) {    
    this._id = ID;
    localStorage.setItem("id",ID);

    const digestMessage = async () => {
      const msgUint8 = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1',msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer)); 
      const result:string = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      this._password = result;
      this.getInput().subscribe((data:any) => {
        if(data.result) {
          console.log("성공");
          console.log(data)
          this.user$.next(data);
          localStorage.setItem("token",this.user$.value.data._id)
          this.router.navigate(['/live-studio']);
        } else {
          // console.log("실패");
          this.user$.next(data);
          this.router.navigate(['/live-studio']);
        }
      });
    }
    digestMessage();
  }
}