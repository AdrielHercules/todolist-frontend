import { Component, input, output } from '@angular/core';
import { Task } from '../models/task';
import { NgClass } from '@angular/common';
import { LongPressDirective } from '../../shared/directives/long-press.directive';
@Component({
  selector: 'app-task-item',
  imports: [NgClass, LongPressDirective],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  task = input.required<Task>();
  taskChanged = output<Task>();
  longPress = output<Task>();
  shortPress = output<Task>();
  isSelected = input<boolean>();

  onShortPress() {
    this.shortPress.emit(this.task());
  }

  onLongPress() {
    this.longPress.emit(this.task());
  }

  onCheck(event: MouseEvent) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;

    this.task().completed = isChecked;
    this.taskChanged.emit(this.task());
  }
}
