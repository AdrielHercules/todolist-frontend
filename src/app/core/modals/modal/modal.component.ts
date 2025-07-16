import { AfterViewInit, Component, ElementRef, inject, output } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  hostDirectives: [CdkTrapFocus],
})
export abstract class ModalComponent<T> implements AfterViewInit {
  closed = output<void>();
  confirmed = output<T>();

  private elementRef = inject(ElementRef);
  private modalRoot?: HTMLElement;

  ngAfterViewInit(): void {
    const rootDiv = this.elementRef.nativeElement.querySelector('div');

    if (rootDiv && rootDiv instanceof HTMLElement) {
      this.modalRoot = rootDiv;
      this.modalRoot.setAttribute('tabindex', '-1');
      this.modalRoot.focus();
    }
  }

  focus() {
    this.modalRoot?.focus();
  }
}
