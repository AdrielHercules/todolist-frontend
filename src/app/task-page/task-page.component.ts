import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { TaskItemComponent } from './task-item/task-item.component';
import { AddTaskButtonComponent } from "./add-task-button/add-task-button.component";


@Component({
  selector: 'app-task-page',
  imports: [TaskItemComponent, AddTaskButtonComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
export class TaskPageComponent {
  taskService: TaskService = inject(TaskService);
  listTaks: Task[] = [];

  constructor() {
    this.listTaks = this.taskService.getTasks();
  }

  onAddTask() {
    console.log('work');

    const newTask: Task = {

        id: '14',
        icon: 'icon-check',
        text: 'Final review and approval',
        completed: false,
      }

      this.listTaks.push(newTask);
    }

  }
