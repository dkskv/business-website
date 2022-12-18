import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { phoneNumbers } from 'src/utils/contacts';
import { formatPhoneNumber } from 'src/utils/phoneNumberFormatter';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  routes = [
    { link: '/about-us', label: 'О нас' },
    { link: '/service-list', label: 'Список услуг' },
    { link: '/service-request', label: 'Оставить заявку' },
  ];

  constructor(private _snackBar: MatSnackBar) {}

  phoneNumber = phoneNumbers[0];

  get formattedPhoneNumber() {
    return formatPhoneNumber(this.phoneNumber);
  }

  private onPhoneClick() {
    navigator.clipboard.writeText(this.formattedPhoneNumber).then(() => {
      this._snackBar.open('Номер скопирован!', undefined, { duration: 1000 });
    });
  }
}
