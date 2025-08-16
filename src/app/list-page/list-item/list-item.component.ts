import { Component, input } from '@angular/core';
import { List } from '../models/list';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-item',
  imports: [NgClass],
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  list = input<List>();
  isSelected = input<boolean>();
}
