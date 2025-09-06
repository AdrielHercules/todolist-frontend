import { Component, inject } from '@angular/core';
import { IconButtonComponent } from '../shared/components/icon-button/icon-button.component';
import { TopBarService } from '../layout/top-bar/services/top-bar.service';
import { Router } from '@angular/router';
import { Icons } from '../shared/icons';
import { IconService } from '../core/icons/icon.service';

@Component({
  selector: 'app-user-page',
  imports: [IconButtonComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent {
  topbarService = inject(TopBarService);
  router = inject(Router);

  protected iconService = inject(IconService);

  constructor() {
    this.topbarService.setConfig({
      transparent: true,
      leftButtons: [{ icon: Icons.BACK, callback: this.navigateBack.bind(this) }],
    });
  }

  navigateBack() {
    this.router.navigate(['/']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToTheme() {
    this.router.navigate(['/theme']);
  }
}
