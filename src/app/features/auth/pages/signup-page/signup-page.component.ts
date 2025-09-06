import { Component, inject } from '@angular/core';
import { TopBarService } from '../../../../layout/top-bar/services/top-bar.service';
import { Router } from '@angular/router';
import { Icons } from '../../../../shared/icons';

@Component({
  selector: 'app-signup-page',
  imports: [],
  templateUrl: './signup-page.component.html',
})
export class SignupPageComponent {
  topBarService: TopBarService = inject(TopBarService);
  private router = inject(Router);

  constructor() {
    this.topBarService.setConfig({
      title: 'Crear cuenta',
      centerTitle: true,
      leftButtons: [{ icon: Icons.BACK, callback: this.onBackButton.bind(this) }],
      rightButtons: [],
    });
  }

  onBackButton() {
    this.router.navigate(['/login']);
  }
}
