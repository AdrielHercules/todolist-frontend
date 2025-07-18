import { Component, inject } from '@angular/core';
import { List } from '../models/list';
import { ListItemComponent } from './list-item/list-item.component';
import { ListService } from '../services/list.service';
import { AddListButtonComponent } from './add-list-button/add-list-button.component';
import { AddListComponent } from './add-list/add-list.component';
import { ModalService } from '../core/modals/modal.service';

@Component({
  selector: 'app-list-page',
  imports: [ListItemComponent, AddListButtonComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent {
  private listService: ListService = inject(ListService);
  private modalService = inject(ModalService);

  lists: List[] = [];

  constructor() {
    this.lists = this.listService.getLists();
  }

  onAddListClick() {
    const component = this.modalService.openModal<Partial<List>>(AddListComponent);

    component?.confirmed.subscribe((list) => {
      this.listService.addList(list);
    });
  }
}
