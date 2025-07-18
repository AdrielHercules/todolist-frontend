/**
 * Directiva para detectar pulsaciones largas
 *
 * @example
 * <div appLongPress [duration]="600" (longPressed)="onLongPress($event)">
 *   Contenido
 * </div>
 *
 *
 * @note Si la usas con routerLink, añade preventDefault() en tu función:
 * onLongPress(event: Event) {
 *   event.preventDefault();
 *   // tu lógica
 * }
 */

import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appLongPress]',
})
export class LongPressDirective implements OnInit, OnDestroy {
  @Input() duration = 250;
  @Output() longPressed = new EventEmitter<void>();

  private timeOutId: number | null = null;
  private listeners: (() => void)[] = [];

  private rendered = inject(Renderer2);
  private elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.addListeners();
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  addListeners(): void {
    const element = this.elementRef.nativeElement;
    this.listeners = [
      this.rendered.listen(element, 'mousedown', this.startPress),
      this.rendered.listen(element, 'mouseup', this.cancelPress),
      this.rendered.listen(element, 'mouseleave', this.cancelPress),
      this.rendered.listen(element, 'touchstart', this.startPress),
      this.rendered.listen(element, 'touchend', this.cancelPress),
      this.rendered.listen(element, 'touchcancel', this.cancelPress),
    ];
  }

  private startPress = (event: Event): void => {
    this.cancelPress();
    this.timeOutId = setTimeout(() => {
      this.longPressed.emit();
      event.preventDefault(); // cuidado con esto, véase abajo
    }, this.duration);
  };

  private cancelPress = (): void => {
    if (this.timeOutId != null) clearTimeout(this.timeOutId);
    this.timeOutId = null;
  };

  private removeListeners() {
    this.cancelPress();
    this.listeners.forEach((unlisten) => unlisten());
    this.listeners = [];
  }
}
