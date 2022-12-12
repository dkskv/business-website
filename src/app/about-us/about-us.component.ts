import { Component, OnInit } from '@angular/core';
import { BenefitsService } from 'src/services/benefits.service';
import { CooperationStagesService } from 'src/services/cooperationStages.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  constructor(
    private benefitsService: BenefitsService,
    private cooperationStagesService: CooperationStagesService
  ) {}

  ngOnInit() {
    // todo: некорректная проверка
    if (!this.benefitsService.loaded) {
      this.benefitsService.load();
    }

    if (!this.cooperationStagesService.loaded) {
      this.cooperationStagesService.load();
    }
  }

  get isBenefitsLoaded() {
    return this.benefitsService.loaded;
  }

  get benefits() {
    return this.benefitsService.items;
  }

  get isCooperationStagesLoaded() {
    return this.cooperationStagesService.loaded;
  }

  get cooperationStages() {
    return this.cooperationStagesService.items;
  }
}
