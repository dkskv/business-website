import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/services/request.service';
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
    private requestService: RequestService,
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

  getOrderButtonText(serviceName: string) {
    if (this.requestService.form.pristine) {
      return 'Заказать';
    }

    return this.requestService.isServiceSelected(serviceName)
      ? 'Убрать из заявки'
      : 'Добавить к заявке';
  }

  onOrder(serviceName: string) {
    if (this.requestService.form.pristine) {
      this.requestService.selectService(serviceName);
      this.router.navigate(['/service-request']);
      return;
    }

    this.requestService.isServiceSelected(serviceName)
      ? this.requestService.deselectService(serviceName)
      : this.requestService.selectService(serviceName);
  }
}
