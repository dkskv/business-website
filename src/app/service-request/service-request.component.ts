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
  formOfRequest = new FormGroup({
    serviceList: new FormControl("", [Validators.required]),
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
      this._snackBar.open(`${value.name}, Ваша заявка принята!`);

      console.log(this.formOfRequest.value);

      formDirective.resetForm();
    }
  }

  get serviceList() {
    return this._servicesService.items;
  }

  private get phoneControl() {
    return this.formOfRequest.controls.phone;
  }
}
