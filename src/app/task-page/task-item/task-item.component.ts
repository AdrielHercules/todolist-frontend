import { Component, inject, input, ViewContainerRef } from '@angular/core';
import { Task } from '../models/task';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { LongPressDirective } from '../../shared/directives/long-press.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [LongPressDirective, NgClass],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  task = input.required<Task>();

  viewRef = inject(ViewContainerRef);

  onCheck(event: MouseEvent) {
    event.stopPropagation();
    const imputElement = event.target as HTMLInputElement;
    const isCheched = imputElement.checked;

    this.task().completed = isCheched;
  }

  onEditModal() {
    console.log('Abriendo modal de edición para:', this.task().text);
    this.viewRef.createComponent(EditTaskModalComponent);
  }

  onShortPress(): void {
    console.log('¡Pulsación corta detectada para:', this.task().text, '!');
    this.onEditModal();
  }

  onLongPress(): void {
    console.log('¡Pulsación larga detectada para:', this.task().text, '!');
  }
}
