import { Component, Input } from '@angular/core';
import { ICooperationStage } from 'src/services/cooperationStages.service';

@Component({
  selector: 'road-map',
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.scss'],
})
export class RoadMapComponent {
  @Input()
  loading = false;

  @Input()
  stages: ICooperationStage[] = [];

  skeletonCount = 5;
}
