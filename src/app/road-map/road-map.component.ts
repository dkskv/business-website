import { Component, Input } from '@angular/core';
import { IServiceDeliveryStage } from 'src/services/serviceDeliveryStages.service';

@Component({
  selector: 'road-map',
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.scss'],
})
export class RoadMapComponent {
  @Input()
  loading = false;

  @Input()
  stages: IServiceDeliveryStage[] = [];

  skeletonCount = 5;
}
