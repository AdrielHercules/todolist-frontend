import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../core/theme/theme.service';
import { TopBarService } from '../../layout/top-bar/services/top-bar.service';
import { Icons } from '../../shared/icons';
import { Themes } from '../../core/theme/themes';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-edit-theme-page',
  imports: [TitleCasePipe],
  templateUrl: './edit-theme-page.component.html',
})
export class EditThemePageComponent implements OnInit {
  topBarService = inject(TopBarService);
  themeService = inject(ThemeService);
  router = inject(Router);
  themes: string[] = [];

  selectedTheme = '';

  ngOnInit(): void {
    this.topBarService.setConfig({
      title: 'Editar tema',
      leftButtons: [{ icon: Icons.BACK, callback: this.onBackClick.bind(this) }],
    });

    const keys = Object.values(Themes);

    keys.forEach((key, index) => {
      console.log(`${key} has index ${index}`);
      this.themes.push(key);
    });

    this.selectedTheme = this.themeService.getCurrentTheme();
  }

  selectTheme(theme: string) {
    this.themeService.setTheme(theme as Themes);
    this.selectedTheme = theme;
  }

  onBackClick() {
    this.router.navigate(['user']);
  }
}
