import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task';
import { SQLiteService } from '../../../core/database/services/sqlite.service';
import { TaskEntity } from '../../../core/database/models/taskEntity';
import { tasksMockup } from '../models/tasksMockup';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  sqlservice = inject(SQLiteService);
  private taskList: Task[];

  constructor() {
    this.taskList = tasksMockup;
    this.sqlservice.dbReady$.subscribe((r) => {
      if (r) this.loadTasksFromDb();
    });
  }

  taskEntityToTask(taskE: TaskEntity[]): Task[] {
    return taskE.map((te) => {
      return { id: te.id, text: te.text, completed: te.completed, listId: te.list.id };
    });
  }

  async loadTasksFromDb() {
    const tasks = await this.sqlservice.getTaskRepository()?.find({ relations: ['list'] });

    if (tasks !== undefined) {
      this.taskList = this.taskEntityToTask(tasks);
      console.log('Tasks loaded from database');
    } else {
      console.log('Error loading tasks from database.');
    }
  }

  getTasksByListId(id: number) {
    console.log('tasks filtradas: ' + this.taskList.filter((t) => t.listId === id));
    return this.taskList.filter((t) => t.listId === id);
  }

  updateTask(updatedTask: Partial<Task>) {
    if (!updatedTask.text) throw new Error(`Error al actualizar. La tarea debe tener un nombre ${updatedTask}`);
    if (!updatedTask.id) throw new Error(`Error al actualizar. La tarea debe tener un id ${updatedTask}`);

    const task = this.taskList.find((t) => t.id == updatedTask.id);

    if (!task) {
      return;
    }

    task.text = updatedTask.text;
    task.completed = updatedTask.completed ?? task.completed;

    this.sqlservice.saveTask({
      id: task.id,
      text: task.text,
      listId: task.listId,
      completed: task.completed ?? false,
    });
  }

  deleteTask(id: number) {
    for (let i = 0; i < this.taskList.length; i++) {
      const task = this.taskList.at(i);
      if (task?.id === id) {
        this.taskList.splice(i, 1);
      }
    }
  }

  addTask(task: Partial<Task>) {
    if (task.text === undefined || task.text === '') throw new Error('No se puede añadir una tarea sin texto ');
    if (task.listId === undefined) throw new Error('No se puede añadir una tarea sin listId');

    this.taskList.push({
      id: this.taskList.length,
      text: task.text,
      listId: task.listId,
      completed: task.completed ?? false,
    });
    this.sqlservice.saveTask({
      text: task.text,
      listId: task.listId,
      completed: task.completed ?? false,
    });
  }

  getTasks() {
    return this.taskList;
  }
}
