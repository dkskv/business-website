import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface IProvidedService {
  name: string;
  remark: string;
  description: string;
}

@Injectable()
export class ProvidedServicesService {
  constructor(private http: HttpClient) {}

  loaded = false;
  loading = false;
  items: IProvidedService[] = [];

  load() {
    this.loading = true;

    this.http.get(environment.serviceListUrl).subscribe((data) => {
      this.loading = false;
      this.loaded = true;
      this.items = data as IProvidedService[];
    });
  }
}
