import { Component, inject, OnInit } from '@angular/core';
import { List } from './models/list';
import { ListItemComponent } from './list-item/list-item.component';
import { EditListModalComponent } from './edit-list-modal/edit-list-modal.component';
import { ModalService } from '../core/modals/modal.service';
import { Router } from '@angular/router';
import { ListService } from './services/list.service';
import { AddButtonComponent } from '../shared/components/add-button/add-button.component';
import { TopBarService } from '../layout/top-bar/services/top-bar.service';
import { TopBarButtonType } from '../layout/top-bar/models/top-bar-button-type';
import { LongPressDirective } from '../shared/directives/long-press.directive';
import { TopBarButton } from '../layout/top-bar/models/top-bar-button';

@Component({
  selector: 'app-list-page',
  imports: [ListItemComponent, AddButtonComponent, LongPressDirective],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent implements OnInit {
  private router = inject(Router);
  private listService = inject(ListService);
  private modalService = inject(ModalService);
  private topBarService = inject(TopBarService);

  protected lists: List[] = [];
  protected selectedLists: Set<string>;

  constructor() {
    this.selectedLists = new Set<string>();
  }

  ngOnInit(): void {
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
    const modal = this.modalService.openModal<Partial<List>>(EditListModalComponent);
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

        rightButtons: [{ type: TopBarButtonType.USER }],
      });
      return;
    }

    const rightButtons: TopBarButton[] =
      this.selectedLists.size == 1
        ? [
            { type: TopBarButtonType.DELETE, callback: this.removeSelectedLists.bind(this) },
            { type: TopBarButtonType.EDIT, callback: this.editList.bind(this) },
          ]
        : [{ type: TopBarButtonType.DELETE, callback: this.removeSelectedLists.bind(this) }];

    this.topBarService.setConfig({
      title: 'Listas',
      centerTitle: false,
      rightButtons: rightButtons,
    });
  }

  removeSelectedLists() {
    this.lists.filter((l) => this.selectedLists.has(l.id)).forEach((l) => this.listService.removeList(l));

    this.selectedLists.clear();
    this.updateTopBarConfig();
  }

  editList() {
    const selectedList = this.lists.find((l) => this.selectedLists.has(l.id));
    const modal = this.modalService.openModal<Partial<List>>(EditListModalComponent, [
      {
        property: 'inputList',
        value: selectedList,
      },
    ]);
    modal?.confirmed.subscribe((l) => this.listService.updateList(l));
  }
}
