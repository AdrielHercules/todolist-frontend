import { Component, inject } from '@angular/core';
import { TopBarConfig } from './models/top-bar-config';
import { TopBarService } from './services/top-bar.service';
import { TopBarButton } from './models/top-bar-button';
import { NgClass } from '@angular/common';
import { iconsFile } from '../../shared/icons';

@Component({
  selector: 'app-top-bar',
  imports: [NgClass],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  topBarConf: TopBarConfig = {
    title: 'string',
    centerTitle: true,
    transparent: false,
    leftButtons: [],
    rightButtons: [],
  };

  protected iconsFile = iconsFile;

  private topBarService = inject(TopBarService);

  constructor() {
    this.topBarService.getConfig().subscribe((t) => {
      this.topBarConf = t;
    });
  }

  onButtonClick(button: TopBarButton) {
    if (!button.callback) return;
    button.callback();
  }
}
