import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/task';
import { SQLiteService } from '../../../core/database/services/sqlite.service';
import { tasksMockup } from '../models/tasksMockup';
import { Capacitor } from '@capacitor/core';
import { TasksqliteService } from '../../../core/database/services/tasksqlite.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private sqlservice = inject(SQLiteService);
  private taskSqliteService = inject(TasksqliteService);

  private taskList: Task[];
  private isNative: boolean;

  tasks = signal<Task[]>([]);

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    this.taskList = tasksMockup;
    this.sqlservice.dbReady$.subscribe((r) => {
      if (r) this.loadTasksFromDb();
    });
  }

  async loadTasksFromDb() {
    this.taskList = await this.taskSqliteService.loadTaskFromDb();
  }

  getTasksByListId(id: number) {
    console.log('tasks filtradas: ' + this.taskList.filter((t) => t.listId === id));
    return this.taskList.filter((t) => t.listId === id);
  }

  updateTask(updatedTask: Partial<Task>) {
    if (!updatedTask.text) throw new Error(`Error al actualizar. La tarea debe tener un nombre ${updatedTask}`);
    if (!updatedTask.id) throw new Error(`Error al actualizar. La tarea debe tener un id ${updatedTask}`);
    if (!updatedTask.listId) throw new Error(`Error al actualizar. La tarea debe tener un list id ${updatedTask}`);

    const task = this.taskList.find((t) => t.id == updatedTask.id);

    if (!task) throw new Error(`Error al actualizar. No se ha encontrado la tarea con id ${updatedTask.id}`);

    if (this.isNative) {
      this.taskSqliteService.updateTask(updatedTask).then((t) => {
        task.text = t.text ?? task.text;
        task.completed = t.completed ?? task.completed;
      });
      this.tasks.set(this.getTasksByListId(updatedTask.listId));
    } else {
      task.text = updatedTask.text;
      task.completed = updatedTask.completed ?? task.completed;
    }
  }

  deleteTask(taskD: Task) {
    if (this.isNative) {
      if (taskD) this.taskSqliteService.deleteTask(taskD);
    } else {
      for (let i = 0; i < this.taskList.length; i++) {
        const task = this.taskList.at(i);
        if (task?.id === taskD.id) {
          this.taskList.splice(i, 1);

          this.tasks.set(this.tasks().filter((t) => t.id != taskD.id));
          this.taskSqliteService.deleteTask(task);
        }
      }
    }
  }

  addTask(task: Partial<Task>) {
    if (!task.text) throw new Error('No se puede añadir una tarea sin texto ');
    if (!task.listId) throw new Error('No se puede añadir una tarea sin listId');
    if (!task.listId) throw new Error(`Error al actualizar. La tarea debe tener un list id ${task}`);

    if (this.isNative) {
      const savedTask = this.taskSqliteService.addTask({
        text: task.text,
        listId: task.listId,
        completed: task.completed ?? false,
      });
      this.tasks.set(this.getTasksByListId(task.listId));
      savedTask.then((t) => this.taskList.push(t));
    } else {
      this.taskList.push({
        id: this.taskList.length,
        text: task.text,
        listId: task.listId,
        completed: task.completed ?? false,
      });
    }
  }

  getTasks() {
    return this.taskList;
  }
}
