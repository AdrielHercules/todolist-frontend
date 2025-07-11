import { Routes } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { TaskPageComponent } from './task-page/task-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ListPageComponent,
    title: 'Listas',
  },
  {
    path: 'tasks/:listId',
    component: TaskPageComponent,
    title: 'Lista de tareas',
  },
];
