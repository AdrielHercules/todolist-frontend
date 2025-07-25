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
import { LongPressDirective } from '../shared/directives/long-press.directive';

@Component({
  selector: 'app-list-page',
  imports: [ListItemComponent, AddButtonComponent, LongPressDirective],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent {
  private router = inject(Router);
  private listService = inject(ListService);
  private modalService = inject(ModalService);
  private topBarService = inject(TopBarService);

  lists: List[] = [];
  protected selectedLists: Set<string>;

  constructor() {
    this.selectedLists = new Set<string>();
    this.lists = this.listService.getLists();

    this.updateTopBarConfig();
  }

  onListClick(listId: string) {
    if (this.isSelecting()) {
      this.toggleList(listId);
      return;
    }

    this.router.navigate(['/tasks', listId]);
  }

  onAddListClick() {
    const modal = this.modalService.openModal<Partial<List>>(AddListModalComponent);
    modal?.confirmed.subscribe((list) => this.listService.addList(list));
  }

  toggleList(listId: string) {
    if (this.selectedLists.has(listId)) {
      this.selectedLists.delete(listId);
      this.updateTopBarConfig();
      return;
    }

    this.selectedLists.add(listId);
    this.updateTopBarConfig();
  }

  isSelecting(): boolean {
    return this.selectedLists.size !== 0;
  }

  updateTopBarConfig() {
    if (!this.isSelecting()) {
      this.topBarService.setConfig({
        title: 'Listas',
        centerTitle: false,

        rightButtons: [{ type: TopBarButtonType.SHARE }],
      });
      return;
    }

    const rightButtons =
      this.selectedLists.size == 1
        ? [{ type: TopBarButtonType.DELETE }, { type: TopBarButtonType.EDIT }]
        : [{ type: TopBarButtonType.DELETE }];

    this.topBarService.setConfig({
      title: 'Listas',
      centerTitle: false,
      rightButtons: rightButtons,
    });
  }
}
