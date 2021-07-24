import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {
    movePage:boolean = false;
    
    constructor(private router: Router, private loginService: LoginService) {}

    canActivate(Route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
        console.log(this.loginService.user$.value.result)
        if(this.loginService.user$.value.result) {
            return true;
        } else if(!this.loginService.user$.value.result) {
            alert("로그인 실패");
            this.router.navigate(['/login']);
            return false;
        }
    }
}