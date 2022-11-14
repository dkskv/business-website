import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  routes = [
    { link: "/about-us", label: "О нас" },
    { link: "/service-list", label: "Список услуг" },
    { link: "/service-request", label: "Оставить заявку" },
  ];

  constructor(private _snackBar: MatSnackBar) { }

  phoneNumber = "+7 (xxx) xxx-xx-xx";

  onPhoneClick() {
    navigator.clipboard.writeText(this.phoneNumber).then(() => {
      this._snackBar.open("Номер скопирован!", undefined, { duration: 1000 });
    });
  }
}
