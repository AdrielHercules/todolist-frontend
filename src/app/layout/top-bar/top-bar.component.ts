import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopBarConfig } from './models/top-bar-config';
import { TopBarService } from './services/top-bar.service';
import { TopBarButton } from './models/top-bar-button';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  topBarConf: TopBarConfig = {
    title: 'string',
    centerTitle: true,
    leftButtons: [],
    rightButtons: [],
  };

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
