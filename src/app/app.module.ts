import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { EstadisticasService } from './estadisticas.service';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    EstadisticasComponent    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    EstadisticasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
