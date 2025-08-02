import { Component, inject } from '@angular/core';
import { IconButtonComponent } from '../shared/components/icon-button/icon-button.component';
import { TopBarService } from '../layout/top-bar/services/top-bar.service';
import { TopBarButtonType } from '../layout/top-bar/models/top-bar-button-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  imports: [IconButtonComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent {
  topbarService = inject(TopBarService);
  router = inject(Router);

  constructor() {
    this.topbarService.setConfig({
      transparent: true,
      leftButtons: [{ type: TopBarButtonType.BACK, callback: this.goBack.bind(this) }],
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
