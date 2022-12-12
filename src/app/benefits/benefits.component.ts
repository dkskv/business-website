import { Component, Input } from '@angular/core';
import { IBenefit } from 'src/services/benefits.service';

@Component({
  selector: 'benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss'],
})
export class BenefitsComponent {
  @Input()
  loading = false;

  @Input()
  items: IBenefit[] = [];

  skeletonCount = 3;
}
