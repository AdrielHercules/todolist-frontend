import { Routes } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page/signup-page.component';

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
  {
    path: 'user',
    component: UserPageComponent,
    title: 'Usuario',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login page',
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    title: 'Signup page',
  },
];
