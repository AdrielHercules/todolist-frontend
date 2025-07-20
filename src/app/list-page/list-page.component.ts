import { Component, inject } from '@angular/core';
import { List } from './models/list';
import { ListItemComponent } from './list-item/list-item.component';
import { ListService } from '../services/list.service';
import { AddListButtonComponent } from './add-list-button/add-list-button.component';
import { AddListModalComponent } from './add-list-modal/add-list-modal.component';
import { ModalService } from '../core/modals/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  imports: [ListItemComponent, AddListButtonComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent {
  private router = inject(Router);
  private listService: ListService = inject(ListService);
  private modalService = inject(ModalService);

  lists: List[] = [];

  constructor() {
    this.lists = this.listService.getLists();
  }

  onListClick(listId: string) {
    this.router.navigate(['/tasks', listId]);
  }

  onAddListClick() {
    const component = this.modalService.openModal<Partial<List>>(AddListModalComponent);

    component?.confirmed.subscribe((list) => {
      this.listService.addList(list);
    });
  }
}
