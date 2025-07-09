import { Injectable } from '@angular/core';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  lists: List[] = [
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
  ];

  getLists() {
    return this.lists;
  }
}
