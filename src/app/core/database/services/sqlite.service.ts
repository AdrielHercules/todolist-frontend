import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DataSource } from 'typeorm';
import { TaskEntity } from '../models/taskEntity';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../../task-page/models/task';
import { ListEntity } from '../models/listEntity';
import { List } from '../../../list-page/models/list';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private sqliteConnection: SQLiteConnection | null = null;
  private dbConnection: DataSource | null = null;
  private isNative = false;
  public dbReady$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
  }

  async initializeDatabase(dbName: string, passphrase: string): Promise<void> {
    try {
      // Open or create DB
      this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);

      // Always set the passphrase before first use
      const isSecretStoredResult = await this.sqliteConnection.isSecretStored();
      const isSecretStored = isSecretStoredResult?.result === true;

      if (!isSecretStored) {
        // First time: store the secret
        await this.sqliteConnection.setEncryptionSecret(passphrase);
      } else {
        // Validate the secret
        const checkResult = await this.sqliteConnection.checkEncryptionSecret(passphrase);
        if (!checkResult.result) {
          throw new Error('Passphrase does not match stored secret.');
        }
      }

      this.dbConnection = new DataSource({
        type: 'capacitor',
        database: dbName,
        driver: this.sqliteConnection,
        mode: 'secret',
        logging: true,
        entities: [TaskEntity, ListEntity],
      });
      this.dbConnection = await this.dbConnection.initialize();

      await this.dbConnection.synchronize();

      this.dbReady$.next(true);
    } catch (error) {
      console.error('Failed to initialize the database:', error);
    }
  }

  async saveTask(task: Partial<Task>) {
    const taskRepo = this.getTaskRepository();
    if (taskRepo === undefined) throw new Error('SQLite error: task repository is undefined.');

    const list = await this.getListRepository()?.findOneBy({ id: task.listId });
    if (!list) {
      throw new Error(`SQLite error on save: cannot find list with id ${task.listId}`);
    }

    const taskEntity: Partial<TaskEntity> = taskRepo.create({
      text: task.text!,
      completed: task.completed ?? false,
      list: list,
    });

    await taskRepo?.save(taskEntity);
  }

  async saveList(list: Partial<List>) {
    const listRepo = this.getListRepository();
    if (listRepo === undefined) throw new Error('SQLite error: task repository is undefined.');

    const listEntity = listRepo.create({
      name: list.name,
      icon: list.icon,
      id: Number(list.id),
    });
    if (listEntity === undefined) throw new Error('SQLite error: task entity can not be created.');

    await listRepo?.save(listEntity);
  }

  async changePassphrase(oldPassphrase: string, newPassphrase: string): Promise<void> {
    try {
      await this.sqliteConnection?.changeEncryptionSecret(oldPassphrase, newPassphrase);
    } catch (error) {
      console.error('Failed to change passphrase:', error);
    }
  }

  getTaskRepository() {
    return this.dbConnection?.getRepository(TaskEntity);
  }

  getListRepository() {
    return this.dbConnection?.getRepository(ListEntity);
  }

  listEntityToList(listEntities: ListEntity[]): List[] {
    return listEntities.map((e) => {
      return { name: e.name, icon: e.icon, id: String(e.id) };
    });
  }
}
