import { Component, inject } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { TaskItemComponent } from './task-item/task-item.component';
import { ActivatedRoute } from '@angular/router';
import { AddButtonComponent } from '../shared/components/add-button/add-button.component';

@Component({
  selector: 'app-task-page',
  imports: [TaskItemComponent, AddButtonComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
export class TaskPageComponent {
  taskService: TaskService = inject(TaskService);
  listTaks: Task[] = [];
  private activatedRoute = inject(ActivatedRoute);
  private listId: string;

  constructor() {
    this.listId = '';
    const id = this.activatedRoute.snapshot.paramMap.get('listId');
    if (id != null) {
      this.listId = id;
    }
    this.listTaks = this.taskService.getTasksByListId(this.listId);
  }

  onAddTask() {
    const newTask: Partial<Task> = {
      text: 'Final review and approval',
      listId: this.listId,
    };

    this.taskService.pushTask(newTask);
    this.listTaks = this.taskService.getTasksByListId(this.listId);
  }
}
