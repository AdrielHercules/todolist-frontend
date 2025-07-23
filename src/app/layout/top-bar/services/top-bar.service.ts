import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TopBarConfig } from '../models/top-bar-config';

@Injectable({
  providedIn: 'root',
})
export class TopBarService {
  private topBarConf = new Subject<TopBarConfig>();

  setConfig(config: Partial<TopBarConfig>) {
    this.topBarConf.next({
      title: config.title ?? '',
      centerTitle: config.centerTitle ?? true,

      homeButton: config.homeButton,
      returnButton: config.returnButton,
      shareButton: config.shareButton,
      deleteButton: config.deleteButton,
      checkAllButton: config.checkAllButton,
      userButton: config.userButton,
    });
  }

  getConfig(): Subject<TopBarConfig> {
    return this.topBarConf;
  }
}
