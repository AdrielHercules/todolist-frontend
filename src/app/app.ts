import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalHostComponent } from './core/modals/modal-host/modal-host.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { ThemeService } from './core/theme/theme.service';
import { Themes } from './core/theme/themes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent, ModalHostComponent],
  templateUrl: './app.html',
})
export class App {
  protected title = 'todolist-frontend';
  themeService = inject(ThemeService);

  constructor() {
    this.themeService.setTheme(Themes.DEFAULT);
  }
}
