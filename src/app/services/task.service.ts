import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskList: Task[] = [
    {
      id: '1',
      icon: 'icon-calendar',
      text: 'First task',
      completed: false,
    },
    {
      id: '2',
      icon: 'icon-bowl',
      text: 'Second task',
      completed: false,
    },
    {
      id: '3',
      icon: 'icon-game-controller',
      text: 'Third task',
      completed: false,
    },
  ];
  constructor() {}

  getTasks() {
    return this.taskList;
  }
}
