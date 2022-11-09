import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input()
  name: string = "default name";

  constructor() { }

  ngOnInit(): void {
    console.log("main mounted");
  }

}
