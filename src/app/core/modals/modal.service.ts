import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { ModalInput } from './modal-input';

/**
 * Service that manages the lifecycle of modal dialogs within the application.
 *
 * - Ensures only one modal is open at a time (stacked behavior supported).
 * - Handles focus trapping for accessibility.
 * - Manages the page scroll lock when modals are open.
 *
 * To use this service, ensure a `ModalHost` component exists in the DOM
 * or provide the necessary `ViewContainerRef` for rendering modals.
 *
 */
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private viewContainer: ViewContainerRef | null = null;
  private initialized = false;

  private modals: ModalComponent<unknown>[] = [];

  /**
   * Initializes the `ModalService` by providing a `ViewContainerRef` where modals will be dynamically created.. This method will be called automatically if a `ModalHost` component is added to the DOM.
   * This method is usually called automatically when a `ModalHost` component is rendered. It only needs to be called manually if you are managing modal rendering outside of a `ModalHost`.
   * @remarks Must be called before opening any modals.
   * @param viewContainer A reference to the `ViewContainerRef` that will be used to instantiate new modals.
   */
  init(viewContainer: ViewContainerRef) {
    if (this.initialized) {
      console.log('Error: ModalService is already initialized.');
      return;
    }
    this.viewContainer = viewContainer;
    this.initialized = true;
  }

  /**
   * Opens a modal by creating a component of the given type and inserting it into the DOM.
   *
   * @remarks Requires the service to be initialized (see {@link init}).
   * @template T The type of the data the modal will return when confirmed.
   * @param componentType Specifies the type the modal component. Must extend {@link ModalComponent}.
   * @param input Optional list of {@link ModalInput} objects for initializing modal inputs.
   * @returns The created modal instance as a {@link ModalComponent | ModalComponent<T>}, or `undefined` if the service was not initialized.
   * @example const modal = openModal<User>(CreateUserModal, [{ property: 'email', value: 'user@example.com' }]);
   */
  openModal<T>(
    componentType: Type<ModalComponent<T>>,
    input: ModalInput[] | null = null,
  ): ModalComponent<T> | undefined {
    if (!this.initialized || !this.viewContainer) {
      console.log(
        'Error: ModalService is not properly initialized. Make sure to include a `ModalHost` component in the DOM.',
      );
      return undefined;
    }

    const ref = this.viewContainer.createComponent(componentType);

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

  private closeModal(ref: ComponentRef<ModalComponent<unknown>>) {
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
