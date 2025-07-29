import { Injectable } from '@angular/core';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private lists: List[] = [
    {
      id: '0',
      name: 'Mis Tareas',
      icon: '⭐',
    },
    {
      id: '1',
      name: 'Compra',
      icon: '🛒',
    },
    {
      id: '2',
      name: 'Limpieza',
      icon: '🧼',
    },
    {
      id: '3',
      name: 'Trabajo',
      icon: '💼',
    },
    {
      id: '4',
      name: 'Salud',
      icon: '💊',
    },
    {
      id: '5',
      name: 'Ocio',
      icon: '🎮',
    },
  ];

  getLists() {
    return this.lists;
  }

  getListById(id: string) {
    return this.lists.find((l) => l.id == id);
  }

  addList(list: Partial<List>) {
    if (!list.name) throw new Error(`Name missing on list: ${list}`);

    if (!list.icon) throw new Error(`Icon missing on list: ${list}`);

    this.lists.push({
      id: String(this.lists.length),
      name: list.name,
      icon: list.icon,
    });
  }

  removeList(list: List) {
    const listIndex = this.lists.findIndex((l) => l.id === list.id);

    if (listIndex === -1) throw new Error(`List with ID ${list.id} not found.`);

    this.lists.splice(listIndex, 1);
  }

  updateList(listData: Partial<List>) {
    if (!listData.id) throw new Error(`List ID not specified. ${listData}`);

    const list = this.getListById(listData.id);

    if (!list) throw new Error(`List with ID ${listData.id} not found.`);

    list.name = listData.name ?? list.name;
    list.icon = listData.icon ?? list.icon;
  }
}
