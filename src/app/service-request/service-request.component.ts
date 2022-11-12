import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, scan, startWith } from 'rxjs';
import { parsePhoneNumber } from 'src/utils/parsePhoneNumber';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss']
})
export class ServiceRequestComponent implements OnInit {
  serviceListPreset = [
    "Покраска",
    "Теплый пол",
    "Возведение стен",
    "Малярка",
    "Штукатурка",
    "Клининг",
    "Под ключ",
    "Двери",
    "Кровля"
  ]

  formOfRequest = new FormGroup({
    serviceList: new FormArray(this.serviceListPreset.map(() => new FormControl(false))),
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(1),
    ]
    ),
    phone: new FormControl("", [Validators.required]),
    comment: new FormControl("")
  });

  constructor() { }

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
    this.phoneControl.setValue(parsePhoneNumber(this.phoneControl.value ?? ""));
  }

  onSubmit() {
    if (this.formOfRequest.valid) {
      const sendingValue = {
        ...this.formOfRequest.value,
        serviceList: this.serviceListPreset
          .filter((_, i) => this.formOfRequest.value.serviceList?.[i])
      }

      console.log(sendingValue);
    }
  }

  get serviceListControls() {
    return this.formOfRequest.controls.serviceList.controls;
  }

  private get phoneControl() {
    return this.formOfRequest.controls.phone;
  }
}
