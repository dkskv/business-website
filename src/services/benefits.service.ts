import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from 'src/utils/apiUrls';
import { FetchService } from './fetch.service';

export interface IBenefit {
  name: string;
  icon: string;
  description: string;
}

@Injectable()
export class BenefitsService extends FetchService<IBenefit[]> {
  constructor(http: HttpClient) {
    super(http, apiUrls.benefits);
  }

  get items() {
    return this.value ?? [];
  }
}
