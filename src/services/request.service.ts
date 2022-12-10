import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IRequest {
  serviceList: string[] | null;
  name: string | null;
  phone: string | null;
  comment: string | null;
}

@Injectable()
export class RequestService {
  private savedRequest: Partial<IRequest> = {};
  submitting = false;

  constructor(private http: HttpClient) {}

  save(value: Partial<IRequest>) {
    this.savedRequest = value;
  }

  restore() {
    return this.savedRequest;
  }

  submit(value: Partial<IRequest>) {
    this.submitting = true;

    return this.http.post(environment.serviceRequestHandlerUrl, value).pipe(
      tap({
        next: () => {
          this.submitting = false;
        },
        error: () => {
          this.submitting = false;
        },
      })
    );
  }
}
