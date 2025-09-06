import { Routes } from '@angular/router';
import { ListPageComponent } from './features/list/pages/list-page.component';
import { TaskPageComponent } from './features/task/pages/task-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { EditThemePageComponent } from './user-page/edit-theme-page/edit-theme-page.component';

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
  {
    path: 'theme',
    component: EditThemePageComponent,
    title: 'Editar tema',
  },
];
