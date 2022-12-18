import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { apiUrls } from 'src/utils/apiUrls';
import { phoneNumberPattern } from 'src/utils/phoneNumberFormatter';

export interface IRequest {
  serviceList: string[] | null;
  name: string | null;
  phone: string | null;
  comment: string | null;
}

@Injectable()
export class RequestService {
  submitting = false;

  readonly form = new FormGroup({
    serviceList: new FormControl<string[]>([], [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(phoneNumberPattern),
    ]),
    comment: new FormControl(''),
  });

  constructor(private http: HttpClient) {}

  isServiceSelected(name: string) {
    return this.serviceList.includes(name);
  }

  selectService(name: string) {
    const nextValue = [name, ...this.serviceList];
    this.form.controls.serviceList.setValue(nextValue);
  }

  deselectService(name: string) {
    const nextValue = this.serviceList.filter((n) => n !== name);
    this.form.controls.serviceList.setValue(nextValue);
  }

  private get serviceList() {
    return this.form.value.serviceList ?? [];
  }

  submit() {
    const { value } = this.form;
    this.submitting = true;

    return this.http.post(apiUrls.serviceRequest, value).pipe(
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
