import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }

  items = [
    "Покраска",
    "Теплый пол",
    "Возведение стен",
    "Малярка",
    "Штукатурка",
    "Клининг",
    "Под ключ",
    "Двери",
    "Кровля"
  ];
}
