import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from 'src/utils/apiUrls';
import { FetchService } from './fetch.service';

export interface ICooperationStage {
  name: string;
  icon: string;
  description: string;
}

@Injectable()
export class CooperationStagesService extends FetchService<
  ICooperationStage[]
> {
  constructor(http: HttpClient) {
    super(http, apiUrls.cooperationStages);
  }

  get items() {
    return this.value ?? [];
  }
}
