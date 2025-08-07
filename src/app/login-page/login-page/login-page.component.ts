import { Component, inject } from '@angular/core';
import { TopBarService } from '../../layout/top-bar/services/top-bar.service';
import { TopBarButtonType } from '../../layout/top-bar/models/top-bar-button-type';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  topBarService: TopBarService = inject(TopBarService);
  private router = inject(Router);

  constructor() {
    this.topBarService.setConfig({
      title: 'Iniciar Sesión',
      centerTitle: true,
      leftButtons: [{ type: TopBarButtonType.BACK, callback: this.onBackButton.bind(this) }],
      rightButtons: [],
    });
  }

  onBackButton() {
    this.router.navigate(['/']);
  }
}
