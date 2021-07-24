import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveStudioComponent } from './live-studio/live-studio.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login-service/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'live-studio', component: LiveStudioComponent, },//canActivate:[LoginGuard]},
  { path: '', redirectTo:'/live-studio', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
