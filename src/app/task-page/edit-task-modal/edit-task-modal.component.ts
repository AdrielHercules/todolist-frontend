import { Component, input, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { ModalComponent } from '../../core/modals/modal/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task-modal',
  imports: [FormsModule],
  templateUrl: './edit-task-modal.component.html',
})
export class EditTaskModalComponent extends ModalComponent<Partial<Task>> implements OnInit {
  task = input<Task>();

  protected text?: string;
  protected isClosing: boolean;
  protected completed = false;

  constructor() {
    super();
    this.isClosing = false;

    this.text = this.task()?.text;
  }

  ngOnInit(): void {
    const taskValue = this.task();
    if (taskValue) {
      this.text = taskValue.text;
      this.completed = taskValue.completed;
    }
  }

  onConfirmClicked() {
    const currentTask = this.task();
    if (!currentTask || !this.text?.trim()) return;

    this.confirmed.emit({
      text: this.text,
      completed: this.completed,
      id: currentTask.id,
    });
  }

  close() {
    this.isClosing = true;
  }

  onAnimationEnd(): void {
    if (this.isClosing) {
      this.closed.emit();
      this.isClosing = false;
    }
  }
}
