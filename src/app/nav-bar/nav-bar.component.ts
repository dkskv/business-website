import { Component } from '@angular/core';

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

  constructor() { }
}
