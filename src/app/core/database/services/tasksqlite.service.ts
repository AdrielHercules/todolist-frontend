import { inject, Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { TaskEntity } from '../models/taskEntity';
import { Task } from '../../../features/task/models/task';
import { Repository } from 'typeorm';
import { ListEntity } from '../models/listEntity';
import { ListSQLiteService } from './listsqlite.service';

@Injectable({
  providedIn: 'root',
})

/*
Voy a necesitar un AddTask, UpdateTask, DeleteTask
*/
export class TasksqliteService {
  private sqliteService = inject(SQLiteService);
  private taskRepo: Repository<TaskEntity>;
  private listsqliteService = inject(ListSQLiteService);

  constructor() {
    this.taskRepo = this.sqliteService.getTaskRepository();

    if (this.taskRepo === undefined) throw new Error('SQLite error: task repository is undefined.');
  }

  async loadTaskFromDb(): Promise<Task[]> {
    try {
      const tasks = await this.sqliteService.getTaskRepository()?.find({ relations: ['list'] });

      if (tasks === undefined) throw new Error('Tasks from BD: undefined');
      return this.taskEntitiesToTasks(tasks);
    } catch (error) {
      throw new Error(`Error loading tasks from database. ${error}`);
    }
  }

  taskEntitiesToTasks(taskE: TaskEntity[]): Task[] {
    return taskE.map((e) => this.taskEntityToTask(e));
  }

  taskEntityToTask(taskE: TaskEntity): Task {
    return { id: taskE.id, text: taskE.text, completed: taskE.completed, listId: taskE.list.id };
  }

  async addTask(task: Partial<Task>): Promise<Task> {
    if (!task.listId) throw new Error(`Cant save a task with no ListId : ${task}`);

    try {
      const list = await this.sqliteService.getListRepository().findOneBy({ id: task.listId });
      if (!list) throw new Error(`Cant save task no list id found`);

      const taskEntity: TaskEntity = this.taskRepo.create({
        text: task.text,
        completed: task.completed ?? false,
        list: list,
      });

      const savedTask = await this.taskRepo?.save(taskEntity);
      return this.taskEntityToTask(savedTask);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async updateTask(task: Partial<Task>): Promise<Task> {
    console.log('TASKSQLITE updateTask recibió:', task);
    if (!task) throw new Error(`Cant update a task with no task : ${task}`);
    if (!task.listId) throw new Error(`Cant update a task with no ListId : ${task}`);
    if (!task.id) throw new Error(`Cant update a task with no id : ${task}`);

    try {
      const taskEntity = await this.taskRepo.findOneBy({ id: task.id });
      console.log('TASKSQLITE taskEntity recibió:', taskEntity);
      if (taskEntity === null) throw new Error(`Cant update task not found task`);

      const updatedEntity = this.taskRepo.merge(taskEntity, task);
      console.log('TASKSQLITE updateENTITY recibió:', updatedEntity);
      return this.taskRepo.save(this.taskEntityToTask(updatedEntity));
    } catch (error) {
      throw new Error(`TASKSQLITE EXCEPTION: ${error}`);
    }
  }
}
