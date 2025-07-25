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
      throw new Error('Error al añadir. No se puede agregar una lista sin nombre ni icono: ' + list);
    }

    this.lists.push({
      id: String(this.lists.length),
      name: list.name,
      icon: list.icon,
    });
  }

  removeList(list: List) {
    const listIndex = this.lists.findIndex((l) => l.id === list.id);
    if (listIndex !== -1) {
      this.lists.splice(listIndex, 1);
    } else {
      console.warn(`Error al eliminar. No se ha encontrado la lista con id ${list.id}`);
    }
  }

  updateList(listData: Partial<List>) {
    if (!listData.id) {
      throw new Error(`Error al actualizar. No se ha especificado un id ${listData.id}`);
    }

    const list = this.lists.find((l) => l.id == listData.id);
    if (!list) {
      console.warn(`Error al actualizar. No se encontró la lista con id ${listData.id}`);
      return;
    }

    list.name = listData.name ?? list.name;
    list.icon = listData.icon ?? list.icon;
  }
}
