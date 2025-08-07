import { Component, input } from '@angular/core';
import { Icons, iconsFile } from '../../icons';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {
  text = input<string>('');
  icon = input.required<Icons>();

  getIcon() {
    return iconsFile + this.icon();
  }
}
