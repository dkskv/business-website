import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProvidedServicesService } from 'src/services/providedServices.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {
  title = 'Список услуг';
  columnCount = 1;

  constructor(
    private _providedServicesService: ProvidedServicesService,
    private _router: Router,
    private _breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this._breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(({ breakpoints }) => {
        this.columnCount = breakpoints[Breakpoints.XSmall]
          ? 1
          : breakpoints[Breakpoints.Small]
          ? 2
          : 4;
      });
  }

  get serviceList() {
    return this._providedServicesService.items;
  }

  onOrder(serviceName: string) {
    this._router.navigate(['/service-request'], { state: { serviceName } });
  }
}
