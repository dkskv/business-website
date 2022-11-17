import { Component, OnInit } from '@angular/core';
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
import { ProvidedServicesService } from 'src/services/providedServices.service';
@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss'],
})
export class ServiceRequestComponent implements OnInit {
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
    private providedServicesService: ProvidedServicesService
  ) {}

  ngOnInit() {
    const initialServiceNames = this.serviceList
      .map(({ name }) => name)
      .filter((name) => name === window.history.state.serviceName);

    this.formOfRequest.controls.serviceList.setValue(initialServiceNames);

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
      this.snackBar.open(`${value.name}, Ваша заявка принята!`, undefined, {
        duration: 3000,
      });

      console.log(this.formOfRequest.value);

      formDirective.resetForm();
    }
  }

  get serviceList() {
    return this.providedServicesService.items;
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
