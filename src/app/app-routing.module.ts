import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceRequestComponent } from './service-request/service-request.component';

// todo: организовать экспорт путей
const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'service-list', component: ServiceListComponent },
  { path: 'service-request', component: ServiceRequestComponent },
  { path: '', redirectTo: 'about-us', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
