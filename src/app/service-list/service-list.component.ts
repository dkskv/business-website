import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/services/services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  constructor(private _servicesService: ServicesService, private _router: Router) { }

  ngOnInit(): void {
  }

  get serviceList() {
    return this._servicesService.items;
  }

  onOrder(service: string) {
    this._router.navigate(["/service-request"], { state: { service } });
  }
}
