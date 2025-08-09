import { Component, computed, inject, signal, ViewContainerRef } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { TaskItemComponent } from './task-item/task-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AddButtonComponent } from '../shared/components/add-button/add-button.component';
import { TopBarService } from '../layout/top-bar/services/top-bar.service';
import { ListService } from '../list-page/services/list.service';
import { ModalService } from '../core/modals/modal.service';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { Icons } from '../shared/icons';
import { ConfirmationModalComponent } from '../shared/modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-task-page',
  imports: [TaskItemComponent, AddButtonComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
export class TaskPageComponent {
  taskService: TaskService = inject(TaskService);
  topBarService: TopBarService = inject(TopBarService);
  listService = inject(ListService);
  viewRef = inject(ViewContainerRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(ModalService);

  tasks = signal<Task[]>([]);
  completedTasks = computed(() => this.tasks().filter((t) => t.completed));
  pendingTasks = computed(() => this.tasks().filter((t) => !t.completed));
  selectedTasks: Set<Task> = new Set<Task>();

  protected selectedTask = false;
  private listId: string;
  private titleList: string;

  constructor() {
    this.listId = '';
    const id = this.activatedRoute.snapshot.paramMap.get('listId');
    if (id != null) {
      this.listId = id;
    }
    this.tasks.set(this.taskService.getTasksByListId(this.listId));

    this.titleList = this.listService.getListById(this.listId)?.name ?? '';
    this.changeTopBar();
  }

  changeTopBar() {
    if (this.selectedTask) {
      this.topBarService.setConfig({
        leftButtons: [{ icon: Icons.BACK, callback: this.onBackButton.bind(this) }],
        rightButtons: [
          { icon: Icons.CHECK, callback: this.onCheckAllSelected.bind(this) },
          { icon: Icons.DELETE, callback: this.onDeleteButton.bind(this) },
        ],
      });
    } else {
      this.topBarService.setConfig({
        title: this.titleList,
        centerTitle: true,
        leftButtons: [{ icon: Icons.HOME, callback: this.onHomeButton.bind(this) }],
        rightButtons: [{ icon: Icons.SHARE }],
      });
    }
  }

  onCheckAllSelected() {
    this.selectedTasks.forEach((t) => {
      t.completed = !t.completed;
      this.taskService.updateTask(t);
    });

    this.tasks.set(this.taskService.getTasksByListId(this.listId));
    this.selectedTasks.clear();
    this.selectedTask = false;
    this.changeTopBar();
  }

  onDeleteButton() {
    if (this.selectedTasks.size === 0) return;

    const component = this.modalService.openModal<boolean>(ConfirmationModalComponent, [
      { property: 'tittle', value: 'Eliminar tareas' },
      { property: 'message', value: '¿Realmente desea eliminar las tareas?' },
    ]);

    component?.confirmed.subscribe((t) => {
      this.selectedTasks.forEach((t) => {
        this.taskService.deleteTask(t.id);
      });

      this.selectedTasks.clear();
      this.tasks.set(this.taskService.getTasksByListId(this.listId));
      this.selectedTask = false;
      this.changeTopBar();
    });

    component?.closed.subscribe(() => {
      console.log('Cerrado');
    });
  }

  onHomeButton() {
    this.router.navigate(['/']);
  }

  onBackButton() {
    this.selectedTask = false;
    this.changeTopBar();
    this.selectedTasks.clear();
  }

  onAddTask() {
    const newTask: Partial<Task> = {
      text: 'New Task',
      listId: this.listId,
      completed: false,
    };

    const component = this.modalService.openModal<Partial<Task>>(EditTaskModalComponent, [
      { property: 'task', value: newTask },
    ]);

    component?.confirmed.subscribe((task) => {
      if (task.text) {
        newTask.text = task.text;
        newTask.completed = task.completed;
        this.addTask(newTask as Task);
      }
    });

    component?.closed.subscribe(() => {
      console.log('Cerrado');
    });
  }

  addTask(newTask: Task) {
    this.taskService.addTask(newTask);
    this.tasks.set(this.taskService.getTasksByListId(this.listId));
  }

  updateTask(updatedTask: Task) {
    this.tasks.update((tasks) => tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    this.taskService.updateTask(updatedTask);
    this.tasks.set(this.taskService.getTasksByListId(this.listId));
  }

  onEditModal(editTask: Task) {
    console.log('Abriendo modal de edición para:', editTask.text);

    const component = this.modalService.openModal<Partial<Task>>(EditTaskModalComponent, [
      { property: 'task', value: editTask },
    ]);

    component?.confirmed.subscribe((updatedTask) => {
      if (updatedTask.id) {
        this.updateTask(updatedTask as Task);
      }
    });

    component?.closed.subscribe(() => {
      console.log('Cerrado');
    });
  }

  onShortPress(editTask: Task) {
    if (this.selectedTasks.size === 0) {
      this.selectedTask = false;
      this.onEditModal(editTask);
    } else {
      if (this.selectedTasks.has(editTask)) {
        this.selectedTasks.delete(editTask);
      } else {
        this.selectedTasks.add(editTask);
      }
    }

    if (this.selectedTasks.size === 0) {
      this.selectedTask = false;
      this.changeTopBar();
    }
  }

  onLongPress(editTask: Task) {
    console.log('Long preess : ', editTask.text);

    this.selectedTasks.add(editTask);

    this.selectedTask = true;
    this.changeTopBar();
  }

  isSelected(task: Task): boolean {
    return this.selectedTasks.has(task);
  }
  /* */
}
