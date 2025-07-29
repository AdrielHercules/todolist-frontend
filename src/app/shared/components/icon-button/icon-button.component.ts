import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {
  text = input<string>('Button Text');
  icon = input<string>('');

  getIcon() {
    return 'assets/symbol-defs.svg#' + this.icon();
  }
}
