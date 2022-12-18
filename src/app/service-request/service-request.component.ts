import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { map, scan, startWith } from 'rxjs';
import { formatPhoneNumber } from 'src/utils/phoneNumberFormatter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicesService } from 'src/services/services.service';
import { RequestService } from 'src/services/request.service';
import { phoneNumbers } from 'src/utils/contacts';
@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss'],
})
export class ServiceRequestComponent implements OnInit {
  title = 'Оставить заявку';
  phoneNumbers = phoneNumbers.map(formatPhoneNumber);
  formOfRequest = this.requestService.form;

  constructor(
    private snackBar: MatSnackBar,
    private servicesService: ServicesService,
    private requestService: RequestService
  ) {}

  ngOnInit() {
    if (this.servicesService.pristine) {
      this.servicesService.load();
    }

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

  onPhoneNumberBlur() {
    const { value } = this.phoneControl;
    if (value) {
      this.phoneControl.setValue(formatPhoneNumber(value));
    }
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.formOfRequest.valid) {
      const { value } = this.formOfRequest;

      this.requestService.submit().subscribe({
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
