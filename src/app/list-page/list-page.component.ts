import { Component, inject } from '@angular/core';
import { List } from '../models/list';
import { ListItemComponent } from './list-item/list-item.component';
import { RouterLink } from '@angular/router';
import { ListService } from '../services/list.service';
import { AddListButtonComponent } from './add-list-button/add-list-button.component';

@Component({
  selector: 'app-list-page',
  imports: [ListItemComponent, RouterLink, AddListButtonComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent {
  private listService: ListService = inject(ListService);
  lists: List[] = [];

  constructor() {
    this.lists = this.listService.getLists();
  }

  onAddListClick() {
    console.log('Not implemented.');
  }
}
