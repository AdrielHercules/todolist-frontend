import { Routes } from '@angular/router';
import { ListPageComponent } from './features/list/pages/list-page.component';
import { TaskPageComponent } from './features/task/pages/task-page.component';
import { UserPageComponent } from './features/user/pages/user-page/user-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { SignupPageComponent } from './features/auth/pages/signup-page/signup-page.component';
import { EditThemePageComponent } from './features/user/pages/edit-theme-page/edit-theme-page.component';

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
    title: 'Inicio de sesión',
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    title: 'Registro',
  },
  {
    path: 'theme',
    component: EditThemePageComponent,
    title: 'Editar tema',
  },
];
