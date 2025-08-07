import { Component } from '@angular/core';
import { getIcon, Icons } from '../../icons';

@Component({
  selector: 'app-add-button',
  imports: [],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css',
})
export class AddButtonComponent {
  protected icons = Icons;
  protected getIcon = getIcon;
}
