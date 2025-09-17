import { inject, Injectable, signal } from '@angular/core';
import { List } from '../models/list';
import { Observable, of, throwError } from 'rxjs';
import { SQLiteService } from '../../../core/database/services/sqlite.service';
import { ListSQLiteService } from '../../../core/database/services/listsqlite.service';
import { Capacitor } from '@capacitor/core';

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

  private isNative: boolean;
  private sqliteService = inject(SQLiteService);
  private listSqliteService = inject(ListSQLiteService);

  private listSignal = signal<List[]>(this.lists);

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    this.sqliteService.dbReady$.subscribe((ready) => {
      if (ready) this.loadListsFromDb();
    });
  }

  async loadListsFromDb() {
    this.lists = await this.listSqliteService.getLists();
    this.listSignal.set(this.lists);

    console.log(`Lists loaded from database: ${this.lists}`);
  }

  getLists() {
    return this.listSignal;
  }

  getListById(id: string): Observable<List> {
    const list = this.lists.find((l) => l.id == id);
    if (!list) return throwError(() => new Error(`No list found with id: ${id}`));
    return of(list);
  }

  addList(list: Partial<List>) {
    if (!list.name) return throwError(() => new Error(`Error adding list: ${list}. Reason: name missing.`));
    if (!list.icon) return throwError(() => new Error(`Error adding list: ${list}. Reason: icon missing.`));

    if (this.isNative) {
      const newList: Partial<List> = {
        name: list.name,
        icon: list.icon,
      };

      this.listSqliteService
        .addList(newList)
        .then((l) => this.listSignal.update((lists) => [...lists, l]))
        .catch((err) => {
          throw new Error(`Error adding list: ${list}. Reason: ${err}`);
        });
      return;
    }

    // Fallback to web storage
    const localList = { id: this.getNextId(), name: list.name, icon: list.icon };
    this.listSignal.update((lists) => [...lists, localList]);
    return of(localList);
  }

  deleteList(list: List) {
    if (!list.id) return throwError(() => new Error(`Error removing list: ${list}. Reason: id missing.`));

    if (this.isNative) {
      this.listSqliteService
        .deleteList(list)
        .then((removed) => {
          if (removed) {
            this.listSignal.update((lists) => lists.filter((l) => l.id !== list.id));
          }
        })
        .catch((err) => {
          throw new Error(`Error removing list: ${list}. Reason: ${err}`);
        });

      return;
    }

    //TODO: Fallback to web storage
    this.listSignal.update((lists) => lists.filter((l) => l.id !== list.id));
    return of(true);
  }

  updateList(list: Partial<List>) {
    if (!list.id) return throwError(() => new Error(`Error updating list: ${list}. Reason: id missing.`));
    if (!list.name) return throwError(() => new Error(`Error updating list: ${list}. Reason: name missing.`));
    if (!list.icon) return throwError(() => new Error(`Error updating list: ${list}. Reason: icon missing.`));

    const newList: List = {
      id: list.id,
      name: list.name,
      icon: list.icon,
    };

    if (this.isNative) {
      this.listSqliteService
        .updateList(newList)
        .then((updatedList) => {
          this.listSignal.update((lists) =>
            lists.map((l) => {
              return l.id === list.id ? updatedList : l;
            }),
          );
        })
        .catch((err) => {
          throw new Error(`Error updating list: ${list}. Reason: ${err}`);
        });

      return;
    }

    //TODO: Fallback to web storage
    this.listSignal.update((lists) =>
      lists.map((l) => {
        return l.id === list.id ? newList : l;
      }),
    );

    return of(newList);
  }

  private getNextId(): string {
    if (this.lists.length === 0) return '0';
    const maxId = Math.max(...this.lists.map((l) => Number(l.id)));
    return String(maxId + 1);
  }
}
