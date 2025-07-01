import { Component, input } from '@angular/core';
import { List } from '../../models/list';

@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  list = input<List>();
}
