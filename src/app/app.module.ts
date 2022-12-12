import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutComponent } from './layout/layout.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ServicesService } from 'src/services/services.service';
import { BenefitsService } from 'src/services/benefits.service';
import { CooperationStagesService } from 'src/services/cooperationStages.service';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from 'src/services/request.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { RoadMapComponent } from './road-map/road-map.component';
import { BenefitsComponent } from './benefits/benefits.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ServiceRequestComponent,
    ServiceListComponent,
    LayoutComponent,
    AboutUsComponent,
    RoadMapComponent,
    BenefitsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    NgxSkeletonLoaderModule,
    MatDividerModule,
  ],
  providers: [
    ServicesService,
    BenefitsService,
    CooperationStagesService,
    RequestService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
