import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalHostComponent } from './core/modals/modal-host/modal-host.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { ThemeService } from './core/theme/theme.service';
import { Themes } from './core/theme/themes';
import { SQLiteService } from './core/database/services/sqlite.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent, ModalHostComponent],
  templateUrl: './app.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App implements OnInit {
  protected title = 'todolist-frontend';

  private themeService = inject(ThemeService);
  private sqliteService = inject(SQLiteService);

  constructor() {
    this.themeService.setTheme(Themes.LIGHT);
  }

  async ngOnInit() {
    // TODO: Handle 'phrase' properly
    await this.sqliteService.initializeDatabase('todolistDB', 'phrase');
  }
}
