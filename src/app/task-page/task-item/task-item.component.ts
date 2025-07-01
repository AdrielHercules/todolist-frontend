import { Component, Input, input } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input() task?: Task;

  onCheck(event: MouseEvent) {
    const imputElement = event.target as HTMLInputElement;
    const isCheched = imputElement.checked;

    if (this.task) {
      this.task.completed = isCheched;
    }
  }
}
