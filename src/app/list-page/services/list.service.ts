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

  addList(list: Partial<List>) {
    if (!list.name || !list.icon) {
      throw new Error('Error, no se puede agregar una lista sin nombre ni icono: ' + list);
    }

    this.lists.push({
      id: String(this.lists.length),
      name: list.name,
      icon: list.icon,
    });
  }

  removeList(list: List) {
    const listId = this.lists.indexOf(list);
    this.lists.splice(listId, 1);
  }
}
