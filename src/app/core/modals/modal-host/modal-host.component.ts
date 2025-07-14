import { Component, computed, inject, OnInit, Output, ViewContainerRef } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-host',
  imports: [],
  templateUrl: './modal-host.component.html',
})
export class ModalHostComponent implements OnInit {
  @Output() modalOpened = computed(() => this.modalService.isModalOpen());
  viewContainer = inject(ViewContainerRef);
  modalService = inject(ModalService);
  isModalOpen = computed(() => this.modalService.isModalOpen());

  ngOnInit(): void {
    this.modalService.init(this.viewContainer);
  }
}
