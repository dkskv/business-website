import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

interface IProvidedService {
  name: string;
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

    this.http
      .get('assets/providedServices.json')
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        this.loaded = true;
        this.items = data as IProvidedService[];
      });
  }
}
