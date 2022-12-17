import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from 'src/utils/apiUrls';
import { FetchService } from './fetch.service';

export interface IServiceDeliveryStage {
  name: string;
  icon: string;
  description: string;
}

@Injectable()
export class ServiceDeliveryStagesService extends FetchService<
  IServiceDeliveryStage[]
> {
  constructor(http: HttpClient) {
    super(http, apiUrls.serviceDeliveryStages);
  }

  get items() {
    return this.value ?? [];
  }
}
