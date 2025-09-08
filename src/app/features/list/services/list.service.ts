import { inject, Injectable } from '@angular/core';
import { List } from '../models/list';
import { BehaviorSubject, catchError, from, Observable, of, tap, throwError } from 'rxjs';
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

  private listsSubject = new BehaviorSubject<List[]>(this.lists);
  lists$ = this.listsSubject.asObservable();

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    this.sqliteService.dbReady$.subscribe((ready) => {
      if (ready) this.loadListsFromDb();
    });
  }

  async loadListsFromDb() {
    this.lists = await this.listSqliteService.getLists();
    this.listsSubject.next(this.lists);
    console.log(`Lists loaded from database: ${this.lists}`);
  }

  getLists(): Observable<List[]> {
    return this.lists$;
  }

  getListById(id: string): Observable<List> {
    const list = this.lists.find((l) => l.id == id);
    if (!list) return throwError(() => new Error(`No list found with id: ${id}`));
    return of(list);
  }

  addList(list: Partial<List>): Observable<List> {
    if (!list.name) return throwError(() => new Error(`Error adding list: ${list}. Reason: name missing.`));
    if (!list.icon) return throwError(() => new Error(`Error adding list: ${list}. Reason: icon missing.`));

    if (this.isNative) {
      const newList: Partial<List> = {
        name: list.name,
        icon: list.icon,
      };

      const addedList = from(this.listSqliteService.addList(newList)).pipe(
        tap(() => {
          this.loadListsFromDb();
        }),
        catchError((err) => {
          return throwError(() => new Error(`Error adding list: ${list}. Reason: ${err}`));
        }),
      );
      return addedList;
    }

    // Fallback to web storage
    const localList = { id: this.getNextId(), name: list.name, icon: list.icon };
    this.lists = [...this.lists, localList];
    this.listsSubject.next(this.lists);
    return of(localList);
  }

  deleteList(list: List): Observable<boolean> {
    if (!list.id) return throwError(() => new Error(`Error removing list: ${list}. Reason: id missing.`));

    if (this.isNative) {
      return from(this.listSqliteService.deleteList(list)).pipe(
        tap((removed) => {
          if (removed) {
            this.loadListsFromDb();
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(`Error removing list: ${list}. Reason: ${error}`));
        }),
      );
    }

    //TODO: Fallback to web storage
    this.lists = this.lists.filter((l) => l.id !== list.id);
    this.listsSubject.next(this.lists);
    return of(true);
  }

  updateList(list: Partial<List>): Observable<List> {
    if (!list.id) return throwError(() => new Error(`Error updating list: ${list}. Reason: id missing.`));
    if (!list.name) return throwError(() => new Error(`Error updating list: ${list}. Reason: name missing.`));
    if (!list.icon) return throwError(() => new Error(`Error updating list: ${list}. Reason: icon missing.`));

    const newList: List = {
      id: list.id,
      name: list.name,
      icon: list.icon,
    };

    if (this.isNative) {
      const updatedList = from(this.listSqliteService.updateList(newList)).pipe(
        tap(() => {
          this.loadListsFromDb();
        }),
        catchError((error) => {
          return throwError(() => new Error(`Error updating list: ${list}. Reason: ${error}`));
        }),
      );
      return updatedList;
    }

    //TODO: Fallback to web storage
    this.lists = this.lists.map((l) => {
      return l.id === list.id ? newList : l;
    });

    this.listsSubject.next(this.lists);
    return of(newList);
  }

  private getNextId(): string {
    if (this.lists.length === 0) return '0';
    const maxId = Math.max(...this.lists.map((l) => Number(l.id)));
    return String(maxId + 1);
  }
}
