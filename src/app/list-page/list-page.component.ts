import { Component, inject } from '@angular/core';
import { List } from './models/list';
import { ListItemComponent } from './list-item/list-item.component';
import { AddListModalComponent } from './add-list-modal/add-list-modal.component';
import { ModalService } from '../core/modals/modal.service';
import { Router } from '@angular/router';
import { ListService } from './services/list.service';
import { AddButtonComponent } from '../shared/components/add-button/add-button.component';
import { TopBarService } from '../layout/top-bar/services/top-bar.service';
import { TopBarButtonType } from '../layout/top-bar/models/top-bar-button-type';

@Component({
  selector: 'app-list-page',
  imports: [ListItemComponent, AddButtonComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent {
  private router = inject(Router);
  private listService: ListService = inject(ListService);
  private modalService = inject(ModalService);
  private topBarService = inject(TopBarService);

  lists: List[] = [];

  constructor() {
    this.lists = this.listService.getLists();

    this.topBarService.setConfig({
      title: 'Listas',
      centerTitle: true,

      leftButtons: [{ type: TopBarButtonType.BACK }, { type: TopBarButtonType.HOME }],
      rightButtons: [
        { type: TopBarButtonType.SHARE },
        { type: TopBarButtonType.DELETE },
        { type: TopBarButtonType.CHECK },
      ],
    });
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
