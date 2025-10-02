import { inject, Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { TaskEntity } from '../models/taskEntity';
import { Task } from '../../../features/task/models/task';
import { Repository } from 'typeorm';

@Injectable({
  providedIn: 'root',
})

/*
Voy a necesitar un AddTask, UpdateTask, DeleteTask
*/
export class TasksqliteService {
  private sqliteService = inject(SQLiteService);
  private taskRepo: Repository<TaskEntity>;

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
    console.log('TASK ENTITY TO TASK List ID : ', JSON.stringify(taskE.list.id));
    return { id: taskE.id, text: taskE.text, completed: taskE.completed, listId: taskE.list?.id };
  }

  async deleteTask(task: Task): Promise<Task> {
    if (!task) throw new Error('Can´t delete task');
    const taskEntity = await this.taskRepo.findOne({
      where: { id: task.id },
    });

    if (!taskEntity) throw new Error("Can't delete taskEntity because is null");
    const deletedTask = this.taskEntityToTask(taskEntity);
    await this.taskRepo.remove(taskEntity);
    return deletedTask;
  }

  async addTask(task: Partial<Task>): Promise<Task> {
    if (!task.listId) throw new Error(`Can't save a task with no ListId : ${task}`);

    try {
      const list = await this.sqliteService.getListRepository().findOneBy({ id: task.listId });
      if (!list) throw new Error(`Can't save task no list id found`);

      const taskEntity: TaskEntity = this.taskRepo.create({
        text: task.text,
        completed: task.completed ?? false,
        list: list,
      });
      console.log('Task entity add : ', JSON.stringify(taskEntity));
      const savedTask = await this.taskRepo?.save(taskEntity);
      console.log('Saved addTask entity : ', JSON.stringify(savedTask));
      return this.taskEntityToTask(savedTask);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async updateTask(task: Partial<Task>): Promise<Task> {
    console.log('TASKSQLITE updateTask recibió:', JSON.stringify(task));
    if (!task) throw new Error(`Cant update a task with no task : ${task}`);
    if (!task.listId) throw new Error(`Cant update a task with no ListId : ${task}`);
    if (!task.id) throw new Error(`Cant update a task with no id : ${task}`);

    try {
      const taskEntity = await this.taskRepo.findOne({
        where: { id: task.id },
        relations: ['list'],
      });
      console.log('TASKSQLITE taskEntity recibió:', JSON.stringify(taskEntity));

      if (taskEntity === null) throw new Error(`Cant update task not found task`);

      console.log('TASKSQLITE taskEntity before MERGE:', JSON.stringify(taskEntity));
      console.log('TASKSQLITE task before MERGE:', JSON.stringify(task));
      const updatedEntity = this.taskRepo.merge(taskEntity, {
        text: task.text,
        completed: task.completed,
      });
      console.log('TASKSQLITE updateENTITY recibió:', JSON.stringify(updatedEntity));
      const savedEntity = await this.taskRepo.save(updatedEntity);
      return this.taskEntityToTask(savedEntity);
    } catch (error) {
      throw new Error(`TASKSQLITE EXCEPTION: ${error}`);
    }
  }
}
