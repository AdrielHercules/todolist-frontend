import { Component, input } from '@angular/core';
import { List } from '../../models/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-item',
  imports: [RouterLink],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
})
export class ListItemComponent {
  list = input<List>();
}
