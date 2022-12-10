import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ISubmitValue {
  serviceList: string[] | null;
  name: string | null;
  phone: string | null;
  comment: string | null;
}

@Injectable()
export class SubmitRequestService {
  constructor(private http: HttpClient) {}

  submitting = false;

  submit(value: Partial<ISubmitValue>) {
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
