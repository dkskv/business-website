import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from 'src/utils/apiUrls';
import { FetchService } from './fetch.service';

interface IService {
  name: string;
  remark: string;
  description: string;
}

@Injectable()
export class ServicesService extends FetchService<IService[]> {
  constructor(http: HttpClient) {
    super(http, apiUrls.services);
  }

  get items() {
    return this.value ?? [];
  }
}
