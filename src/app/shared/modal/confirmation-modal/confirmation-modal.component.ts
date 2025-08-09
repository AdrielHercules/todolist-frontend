import { Component, input, output } from '@angular/core';
import { ModalComponent } from '../../../core/modals/modal/modal.component';

@Component({
  selector: 'app-confirmation-modal',
  imports: [],
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent extends ModalComponent<boolean> {
  protected isClosing: boolean;
  tittle = input<string>();
  message = input<string>();
  confirm = output<boolean>;

  constructor() {
    super();
    this.isClosing = false;
  }

  onConfirmClick() {
    this.confirmed.emit(true);
  }

  close() {
    this.isClosing = true;
  }

  onAnimationEnd(): void {
    if (this.isClosing) {
      this.closed.emit();
      this.isClosing = false;
    }
  }
}
