import { Component, OnInit } from '@angular/core';
import { BenefitsService } from 'src/services/benefits.service';
import { ServiceDeliveryStagesService } from 'src/services/serviceDeliveryStages.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  constructor(
    private benefitsService: BenefitsService,
    private serviceDeliveryStagesService: ServiceDeliveryStagesService
  ) {}

  ngOnInit() {
    if (this.benefitsService.pristine) {
      this.benefitsService.load();
    }

    if (this.serviceDeliveryStagesService.pristine) {
      this.serviceDeliveryStagesService.load();
    }
  }

  get isBenefitsLoaded() {
    return this.benefitsService.loaded;
  }

  get benefits() {
    return this.benefitsService.items;
  }

  get isServiceDeliveryStagesLoaded() {
    return this.serviceDeliveryStagesService.loaded;
  }

  get serviceDeliveryStages() {
    return this.serviceDeliveryStagesService.items;
  }
}
