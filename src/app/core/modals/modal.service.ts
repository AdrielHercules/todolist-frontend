import { Injectable, signal, Type, ViewContainerRef } from '@angular/core';
import { Modal } from '../modals/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isModalOpen = signal(false);

  private viewContainer: ViewContainerRef | null = null;
  private initialized = false;

  init(viewContainer: ViewContainerRef) {
    this.viewContainer = viewContainer;
    this.initialized = true;
  }

  openModal<C extends Modal<T>, T>(component: Type<C>): C | undefined {
    if (!this.initialized) {
      console.log('Error, ModalService debe ser inicializado antes de abrir modales.');
      return undefined;
    }
    if (!this.viewContainer) return undefined;
    if (this.viewContainer.length > 0) {
      console.log('Error, no solo puede haber un modal abierto al mismo tiempo.');
      return undefined;
    }

    const instance = this.viewContainer?.createComponent(component).instance;
    this.isModalOpen.set(true);

    const subscription = instance?.closed.subscribe(() => {
      this.viewContainer?.clear();
      this.isModalOpen.set(false);
      subscription?.unsubscribe();
    });

    return instance;
  }
}
