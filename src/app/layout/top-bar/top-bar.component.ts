import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopBarConfig } from './models/top-bar-config';
import { TopBarService } from './services/top-bar.service';

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
  };

  private topBarService = inject(TopBarService);

  constructor() {
    this.topBarService.getConfig().subscribe((t) => {
      this.topBarConf = t;
    });
  }

  onButtonClick(callback?: () => void) {
    if (!callback) return;
    callback();
  }
}
