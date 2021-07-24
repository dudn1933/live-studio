import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login-service/login.model'
import { LoginService } from '../login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login$!: Login[];
  inputID!: string;
  inputPassWord!: string;
  accessToken:any;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if(token !== null) {
      this.router.navigate(['/live-studio']);
      this.loginService.user$.next({result:true});
    }
  }

  sendData() {
    this.loginService.getInfo(this.inputID, this.inputPassWord);
  }
}
