import { Injectable } from '@angular/core';
import { Themes } from './themes';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private root: HTMLElement;
  private currentTheme = '';

  constructor() {
    this.root = document.documentElement;
    this.loadTheme();
  }

  private async loadTheme() {
    const savedTheme = (await Preferences.get({ key: 'theme' })).value;
    if (savedTheme) {
      this.updateCurrentTheme(savedTheme);
    }
  }

  private async saveTheme() {
    await Preferences.set({
      key: 'theme',
      value: this.currentTheme,
    });
  }

  setTheme(theme: Themes) {
    const themeName = theme.toString();
    this.updateCurrentTheme(themeName);
    this.saveTheme();
  }

  private updateCurrentTheme(themeName: string) {
    this.removeCurrentTheme();
    this.root.classList.add(`theme-${themeName}`);
    this.currentTheme = themeName;
  }

  private removeCurrentTheme() {
    if (this.currentTheme == '') return;

    this.root.classList.remove(`theme-${this.currentTheme}`);
    this.currentTheme = '';
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
