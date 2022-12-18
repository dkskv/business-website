import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/services/services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {
  title = 'Наши услуги';
  columnCount = 1;

  constructor(
    private servicesService: ServicesService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    if (this.servicesService.pristine) {
      this.servicesService.load();
    }

    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(({ breakpoints }) => {
        this.columnCount = breakpoints[Breakpoints.XSmall]
          ? 1
          : breakpoints[Breakpoints.Small]
          ? 2
          : 4;
      });
  }

  get loading() {
    return this.servicesService.loading;
  }

  get serviceList() {
    return this.servicesService.items;
  }

  onOrder(serviceName: string) {
    this.router.navigate(['/service-request'], { state: { serviceName } });
  }
}
