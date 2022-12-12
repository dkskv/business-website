import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { map, scan, startWith } from 'rxjs';
import {
  formatPhoneNumber,
  phoneNumberPattern,
} from 'src/utils/phoneNumberFormatter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicesService } from 'src/services/services.service';
import { IRequest, RequestService } from 'src/services/request.service';
@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss'],
})
export class ServiceRequestComponent implements OnInit, OnDestroy {
  title = 'Оставить заявку';

  formOfRequest = new FormGroup({
    serviceList: new FormControl<string[]>([], [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(phoneNumberPattern),
    ]),
    comment: new FormControl(''),
  });

  constructor(
    private snackBar: MatSnackBar,
    private servicesService: ServicesService,
    private requestService: RequestService
  ) {}

  ngOnInit() {
    if (this.servicesService.pristine) {
      this.servicesService.load();
    }

    this.restoreValues();
    this.retrieveOrder();

    this.phoneControl.valueChanges
      .pipe(
        startWith(this.phoneControl.value),
        map((a) => a ?? ''),
        scan((prev, next) =>
          next.startsWith(prev) ? formatPhoneNumber(next) : next
        )
      )
      .subscribe((value) => {
        this.phoneControl.setValue(value, { emitEvent: false });
      });
  }

  ngOnDestroy() {
    const { value } = this.formOfRequest;
    this.requestService.save(value);
  }

  private restoreValues() {
    const values = this.requestService.restore();

    for (const [key, value] of Object.entries(values)) {
      this.formOfRequest.controls[key as keyof IRequest].setValue(value as any);
    }
  }

  private retrieveOrder() {
    const initialServiceNames = this.serviceList
      .map(({ name }) => name)
      .filter((name) => name === window.history.state.serviceName);

    if (initialServiceNames.length > 0) {
      const { serviceList } = this.formOfRequest.controls;
      const nextValue = initialServiceNames.concat(serviceList.value ?? []);
      serviceList.setValue(nextValue);
    }
  }

  onPhoneNumberBlur() {
    const { value } = this.phoneControl;
    if (value) {
      this.phoneControl.setValue(formatPhoneNumber(value));
    }
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.formOfRequest.valid) {
      const { value } = this.formOfRequest;

      this.requestService.submit(value).subscribe({
        next: () => {
          this.snackBar.open(`${value.name}, Ваша заявка принята!`, undefined, {
            duration: 3000,
          });
          formDirective.resetForm();
        },
        error: () => {
          this.snackBar.open(
            `${value.name}, извините, форма обратной связи в данный момент недоступна. С нами можно связаться по телефону`,
            undefined,
            {
              duration: 6000,
            }
          );
        },
      });
    }
  }

  get serviceList() {
    return this.servicesService.items;
  }

  get submitting() {
    return this.requestService.submitting;
  }

  get fillProgress() {
    const controls = Object.values(this.formOfRequest.controls);

    const validatedCount = controls.reduce(
      (sum, item) => sum + Number(this.isFieldRequired(item)),
      0
    );

    const validCount = controls.reduce(
      (sum, item) => sum + Number(item.valid && this.isFieldRequired(item)),
      0
    );

    return (validCount / validatedCount) * 100;
  }

  private isFieldRequired(control: FormControl) {
    return control.validator?.({} as AbstractControl)?.['required'] ?? false;
  }

  private get phoneControl() {
    return this.formOfRequest.controls.phone;
  }
}
