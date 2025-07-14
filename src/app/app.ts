import { Component, computed, inject, OnInit, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ModalService } from './core/modals/modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'todolist-frontend';

  viewContainer = inject(ViewContainerRef);
  modalService = inject(ModalService);
  isModalOpen = computed(() => this.modalService.isModalOpen());

  ngOnInit(): void {
    this.modalService.init(this.viewContainer);
  }
}
