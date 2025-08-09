import { Injectable } from '@angular/core';
import { Themes } from './themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private root: HTMLElement;

  constructor() {
    this.root = document.documentElement;
  }

  setTheme(theme: Themes) {
    this.root.classList.add(`theme-${theme.toString()}`);
  }
}
