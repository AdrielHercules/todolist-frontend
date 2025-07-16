import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { ModalInput } from './modal-input';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private viewContainer: ViewContainerRef | null = null;
  private initialized = false;

  private modals: ModalComponent<unknown>[] = [];

  init(viewContainer: ViewContainerRef) {
    this.viewContainer = viewContainer;
    this.initialized = true;
  }

  openModal<T>(component: Type<ModalComponent<T>>, input: ModalInput[] | null = null): ModalComponent<T> | undefined {
    if (!this.initialized) {
      console.log(
        'Error: ModalService is not properly initialized. Make sure to include a <app-modal-host> component.',
      );
      return undefined;
    }
    if (!this.viewContainer) return undefined;

    const ref = this.viewContainer.createComponent(component);

    if (input) {
      input.forEach((element) => {
        ref.setInput(element.property, element.value);
      });
    }

    const instance = ref.instance;
    this.modals.push(instance);

    const closeSubscription = instance.closed.subscribe(() => {
      this.closeModal(ref);
      closeSubscription?.unsubscribe();
    });

    const confirmedSubscription = instance.confirmed.subscribe(() => {
      this.closeModal(ref);
      confirmedSubscription?.unsubscribe();
    });

    document.body.style.overflow = 'hidden';
    return instance;
  }

  closeModal(ref: ComponentRef<ModalComponent<unknown>>) {
    this.viewContainer?.detach(this.viewContainer.length - 1);
    ref.destroy();
    this.modals.pop();

    if (this.modals.length === 0) {
      document.body.style.overflow = '';
    } else {
      const previousModal = this.modals[this.modals.length - 1];
      previousModal.focus();
    }
  }
}
