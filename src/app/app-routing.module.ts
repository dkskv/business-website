import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceRequestComponent } from './service-request/service-request.component';

const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'service-list', component: ServiceListComponent },
  { path: 'service-request', component: ServiceRequestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
