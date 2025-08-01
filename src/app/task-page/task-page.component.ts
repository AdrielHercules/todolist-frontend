import { Component, inject } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { TaskItemComponent } from './task-item/task-item.component';
import { ActivatedRoute } from '@angular/router';
import { AddButtonComponent } from '../shared/components/add-button/add-button.component';
import { TopBarService } from '../layout/top-bar/services/top-bar.service';
import { ListService } from '../list-page/services/list.service';
import { TopBarButtonType } from '../layout/top-bar/models/top-bar-button-type';

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
    const titleList = this.listService.getLists()[Number(this.listId)].name;

    this.topBarService.setConfig({
      title: titleList,
      centerTitle: true,
      leftButtons: [{ type: TopBarButtonType.BACK }, { type: TopBarButtonType.USER }],
      rightButtons: [{ type: TopBarButtonType.HOME }],
    });
  }

  onAddTask() {
    const newTask: Partial<Task> = {
      text: 'Final review and approval',
      listId: this.listId,
    };

    this.taskService.addTask(newTask);
    this.listTaks = this.taskService.getTasksByListId(this.listId);
  }
}
