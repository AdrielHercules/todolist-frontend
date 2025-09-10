import { inject, Injectable } from '@angular/core';
import { List } from '../../../features/list/models/list';
import { ListEntity } from '../models/listEntity';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root',
})
export class ListSQLiteService {
  private sqliteService = inject(SQLiteService);

  async getLists(): Promise<List[]> {
    const listRepo = this.sqliteService.getListRepository();
    const lists = await listRepo.find();

    return this.entitiesToLists(lists);
  }

  async getListById(listId: number): Promise<List> {
    const listRepo = this.sqliteService.getListRepository();
    const list = await listRepo.findOneBy({ id: listId });

    if (list === null) throw new Error(`ListSQLite error: list not found with id: ${listId}`);

    return this.entityToList(list);
  }

  async getListEntityById(listId: number): Promise<ListEntity> {
    const listRepo = this.sqliteService.getListRepository();
    const list = await listRepo.findOneBy({ id: listId });

    if (list === null) throw new Error(`ListSQLite error: list not found with id: ${listId}`);

    return list;
  }

  async addList(list: Partial<List>): Promise<List> {
    const listRepo = this.sqliteService.getListRepository();

    try {
      const listEntity = listRepo.create({
        name: list.name,
        icon: list.icon,
      });
      const entity = await listRepo.save(listEntity);
      return this.entityToList(entity);
    } catch (error) {
      throw new Error(`ListSQLite error: cant save the following list: ${list}. \nReason: ${error}`);
    }
  }

  async deleteList(list: Partial<List>): Promise<boolean> {
    if (!list.id) throw new Error(`ListSQLite error: missing id in partial list ${list}`);

    try {
      const listRepo = this.sqliteService.getListRepository();
      const entity = await this.getListEntityById(Number(list.id));
      await listRepo.remove(entity);

      const deleted = (await listRepo.existsBy({ id: Number(list.id) })) == false;
      return deleted;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateList(list: List): Promise<List> {
    if (!list.id) throw new Error(`ListService Error updating list: ${list}. Reason: id missing.`);
    if (!list.name) throw new Error(`ListService Error updating list: ${list}. Reason: name missing.`);
    if (!list.icon) throw new Error(`ListService Error updating list: ${list}. Reason: icon missing.`);

    try {
      const repository = this.sqliteService.getListRepository();
      const listEntity = await repository.findOneBy({ id: Number(list.id) });

      if (listEntity === null) throw new Error(`ListSQLite error: list with ${list.id} not found`);

      const updatedEntity = repository.merge(listEntity, { ...list, id: Number(list.id) });
      const savedEntity = await repository.save(updatedEntity);
      return this.entityToList(savedEntity);
    } catch (error) {
      throw new Error(`ListSQLite error: cant save the following list: ${list}. \nReason: ${error}`);
    }
  }

  entitiesToLists(listEntities: ListEntity[]): List[] {
    return listEntities.map((e) => this.entityToList(e));
  }

  private entityToList(entity: ListEntity): List {
    return { name: entity.name, icon: entity.icon, id: String(entity.id) };
  }
}
