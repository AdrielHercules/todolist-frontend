import { inject, Injectable } from '@angular/core';
import { List } from '../models/list';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SQLiteService } from '../../../core/database/services/sqlite.service';
import { ListSQLiteService } from '../../../core/database/services/listsqlite.service';

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

  private sqlService = inject(SQLiteService);
  private listsqliteService = inject(ListSQLiteService);
  private nextId = this.lists.length;

  private listsSubject = new BehaviorSubject<List[]>(this.lists);
  lists$ = this.listsSubject.asObservable();

  constructor() {
    this.sqlService.dbReady$.subscribe((ready) => {
      if (ready) this.loadListsFromDb();
    });
  }

  async loadListsFromDb() {
    const lists = await this.listsqliteService.getLists();
    this.lists = lists;
    this.listsSubject.next(this.lists);

    console.log(`Lists loaded from database: ${lists}`);
  }

  getLists(): Observable<List[]> {
    return this.lists$;
  }

  getListById(id: string): Observable<List | undefined> {
    return of(this.lists.find((l) => l.id == id));
  }

  addList(list: Partial<List>): Observable<List> {
    if (!list.name) throw new Error(`Name missing on list: ${list}`);
    if (!list.icon) throw new Error(`Icon missing on list: ${list}`);

    const newList = {
      id: String(this.nextId++),
      name: list.name,
      icon: list.icon,
    };

    this.lists = [...this.lists, newList];
    this.listsSubject.next(this.lists);

    return of(newList);
  }

  removeList(list: List) {
    this.lists = this.lists.filter((l) => l.id !== list.id);
    this.listsSubject.next(this.lists);
  }

  updateList(listData: Partial<List>): Observable<List> {
    if (!listData.id) throw new Error(`List ID not specified. ${listData}`);

    const list = this.lists.find((l) => l.id === listData.id);
    if (!list) throw new Error(`List with ID ${listData.id} not found.`);

    const updated = { ...list, ...listData };
    const index = this.lists.findIndex((l) => l.id === listData.id);

    this.lists[index] = updated;
    this.listsSubject.next([...this.lists]);
    return of(updated);
  }
}
