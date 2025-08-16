import { Component, inject, OnInit } from '@angular/core';
import { List } from './models/list';
import { ListItemComponent } from './list-item/list-item.component';
import { EditListModalComponent } from './edit-list-modal/edit-list-modal.component';
import { ModalService } from '../core/modals/modal.service';
import { Router } from '@angular/router';
import { ListService } from './services/list.service';
import { AddButtonComponent } from '../shared/components/add-button/add-button.component';
import { TopBarService } from '../layout/top-bar/services/top-bar.service';
import { LongPressDirective } from '../shared/directives/long-press.directive';
import { TopBarButton } from '../layout/top-bar/models/top-bar-button';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Icons } from '../shared/icons';

@Component({
  selector: 'app-list-page',
  imports: [ListItemComponent, AddButtonComponent, LongPressDirective, CdkDropList, CdkDrag],
  templateUrl: './list-page.component.html',
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

  onListShortPress(listId: string) {
    if (this.isSelecting()) {
      this.toggleList(listId);
      return;
    }

    this.router.navigate(['/tasks', listId]);
  }

  onListLongPress(listId: string) {
    if (this.selectedLists.has(listId)) return;

    this.toggleList(listId);
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

        rightButtons: [{ icon: Icons.USER, callback: this.onUserClick.bind(this) }],
      });
      return;
    }

    const rightButtons: TopBarButton[] =
      this.selectedLists.size == 1
        ? [
            { icon: Icons.DELETE, callback: this.removeSelectedLists.bind(this) },
            { icon: Icons.EDIT, callback: this.editList.bind(this) },
          ]
        : [{ icon: Icons.DELETE, callback: this.removeSelectedLists.bind(this) }];

    this.topBarService.setConfig({
      title: '',
      centerTitle: false,
      rightButtons: rightButtons,
      leftButtons: [{ icon: Icons.BACK, callback: this.clearSelection.bind(this) }],
    });
  }

  removeSelectedLists() {
    this.lists.filter((l) => this.selectedLists.has(l.id)).forEach((l) => this.listService.removeList(l));

    this.clearSelection();
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

  onUserClick() {
    this.router.navigate(['/user']);
  }

  clearSelection() {
    this.selectedLists.clear();
    this.updateTopBarConfig();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }
}
