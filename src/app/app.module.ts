import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { ServiceListComponent } from './service-list/service-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ServiceRequestComponent,
    ServiceListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
