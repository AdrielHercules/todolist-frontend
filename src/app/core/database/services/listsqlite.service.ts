import { inject, Injectable } from '@angular/core';
import { List } from '../../../features/list/models/list';
import { ListEntity } from '../models/listEntity';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root',
})
export class ListSQLiteService {
  private sqliteService = inject(SQLiteService);

  async getLists() {
    const listRepo = this.sqliteService.getListRepository();
    const lists = await listRepo.find();

    return this.entitiesToLists(lists);
  }

  async getListById(listId: number) {
    const listRepo = this.sqliteService.getListRepository();
    const lists = await listRepo.findOneBy({ id: listId });

    return lists;
  }

  async saveList(list: Partial<List>) {
    const listRepo = this.sqliteService.getListRepository();

    const listEntity = listRepo.create({
      name: list.name,
      icon: list.icon,
      id: Number(list.id),
    });
    if (listEntity === undefined) throw new Error('ListSQLite error: list entity can not be created.');

    await listRepo?.save(listEntity);
  }

  async updateList(list: Partial<List>) {
    if (list.id === undefined) throw new Error(`ListSQLite error: missing id in partial list ${list}`);

    const listRepo = this.sqliteService.getListRepository();
    await listRepo.update(list.id, { name: list.name, icon: list.icon });
  }

  async deleteList(list: Partial<List>) {
    if (list.id === undefined) throw new Error(`ListSQLite error: missing id in partial list ${list}`);

    const listRepo = this.sqliteService.getListRepository();
    await listRepo.delete(list.id);
  }

  entitiesToLists(listEntities: ListEntity[]): List[] {
    return listEntities.map((e) => this.entityToList(e));
  }

  private entityToList(entity: ListEntity): List {
    return { name: entity.name, icon: entity.icon, id: String(entity.id) };
  }

  private async listToEntity(list: Partial<List>): Promise<ListEntity> {
    return this.sqliteService.getListRepository()?.create({ name: list.name, icon: list.icon, id: Number(list.id) });
  }
}
