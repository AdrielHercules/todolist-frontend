import { Injectable } from '@angular/core';
import { Themes } from './themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private root: HTMLElement;
  private currentTheme = '';

  constructor() {
    this.root = document.documentElement;
  }

  setTheme(theme: Themes) {
    this.removeCurrentTheme();

    const name = theme.toString();
    console.debug('Changing theme to: ' + name);
    this.root.classList.add(`theme-${name}`);
    this.currentTheme = name;
  }

  removeCurrentTheme() {
    if (this.currentTheme == '') return;

    console.debug('Removing theme: ' + this.currentTheme);
    this.root.classList.remove(`theme-${this.currentTheme}`);
    this.currentTheme = '';
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
