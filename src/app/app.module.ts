import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { GoogleMapsModule } from '@angular/google-maps';

import { LoginService } from './login-service/login.service';
import { LiveStudioService } from './live-studio/live-studio-service/live-studio.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LiveStudioComponent } from './live-studio/live-studio.component';
import { SpaceComponent } from './live-studio/space/space.component';
import { PatientLocationComponent } from './live-studio/patient-location/patient-location.component';
import { ArrhythmiaComponent } from './live-studio/arrhythmia/arrhythmia.component';
import { SpaceViewComponent } from './live-studio/space/space-view/space-view.component';
import { ViewInformationComponent } from './live-studio/space/view-information/view-information.component';
import { WaveformComponent } from './live-studio/space/space-view/waveform/waveform.component';
import { EcgWaveformComponent } from './live-studio/space/space-view/waveform/ecg-waveform/ecg-waveform.component';
import { RespirationWaveformComponent } from './live-studio/space/space-view/waveform/respiration-waveform/respiration-waveform.component';
import { TrendDataComponent } from './live-studio/space/space-view/trend-data/trend-data.component';
import { TrendDataNumberComponent } from './live-studio/space/view-information/trend-data-number/trend-data-number.component';
import { CurrentStatusComponent } from './live-studio/space/view-information/current-status/current-status.component';
import { LoginGuard } from './login-service/login.guard';
import { WebsocketService } from './live-studio/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LiveStudioComponent,
    SpaceComponent,
    PatientLocationComponent,
    ArrhythmiaComponent,
    SpaceViewComponent,
    ViewInformationComponent,
    WaveformComponent,
    EcgWaveformComponent,
    RespirationWaveformComponent,
    TrendDataComponent,
    TrendDataNumberComponent,
    CurrentStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule
  ],
  providers: [LoginService, LiveStudioService, LoginGuard, WebsocketService, SpaceComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
