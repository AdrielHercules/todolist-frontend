import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { TaskItemComponent } from './task-item/task-item.component';


@Component({
  selector: 'app-task-page',
  imports: [TaskItemComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent {

  taskService: TaskService = inject(TaskService);
  listTaks: Task[] = [];

  constructor () {
    this.listTaks = this.taskService.getTasks();
  }
}
