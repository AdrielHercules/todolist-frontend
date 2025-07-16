import { Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-host',
  imports: [],
  templateUrl: './modal-host.component.html',
})
export class ModalHostComponent implements OnInit {
  private viewContainer = inject(ViewContainerRef);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.modalService.init(this.viewContainer);
  }
}
