import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ModalHostComponent } from './core/modals/modal-host/modal-host.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent, ModalHostComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'todolist-frontend';
}
