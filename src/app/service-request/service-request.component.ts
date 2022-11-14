import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { map, scan, startWith } from 'rxjs';
import { parsePhoneNumber } from 'src/utils/parsePhoneNumber';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicesService } from 'src/services/services.service';
@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss']
})
export class ServiceRequestComponent implements OnInit {
  title = "Оставить заявку";

  formOfRequest = new FormGroup({
    serviceList: new FormControl<string[]>([], [Validators.required]),
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(1),
    ]
    ),
    phone: new FormControl("", [Validators.required]),
    comment: new FormControl("")
  });

  constructor(private _snackBar: MatSnackBar, private _servicesService: ServicesService) { }

  ngOnInit() {
    const initialServiceList = this.serviceList.filter((service) => service === window.history.state.service);
    this.formOfRequest.controls.serviceList.setValue(initialServiceList);

    this.phoneControl.valueChanges
      .pipe(
        startWith(this.phoneControl.value),
        map(a => a ?? ""),
        scan((prev, next) => next.startsWith(prev) ? parsePhoneNumber(next) : next),
      )
      .subscribe((value) => {
        this.phoneControl.setValue(value, { emitEvent: false });
      });
  }

  onPhoneNumberBlur() {
    const { value } = this.phoneControl;
    if (value) {
      this.phoneControl.setValue(parsePhoneNumber(value));
    }
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.formOfRequest.valid) {
      const { value } = this.formOfRequest;
      this._snackBar.open(`${value.name}, Ваша заявка принята!`, undefined, { duration: 3000 });

      console.log(this.formOfRequest.value);

      formDirective.resetForm();
    }
  }

  get serviceList() {
    return this._servicesService.items;
  }

  get fillProgress() {
    const controls = Object.values(this.formOfRequest.controls);
    const validCount = controls.reduce((sum, item) => sum + Number(item.valid), 0)
    return validCount / controls.length * 100;
  }

  private get phoneControl() {
    return this.formOfRequest.controls.phone;
  }
}
