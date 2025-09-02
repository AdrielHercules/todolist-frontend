import { Directive, HostListener, input, output } from '@angular/core';

@Directive({
  selector: '[appLongPress]',
})
export class LongPressDirective {
  duration = input.required<number>();
  longPress = output<void>();
  shortPress = output<void>();

  private longPressTriggered = false;
  private isShort: boolean;
  private timeOutId: number;

  element: Element | null = null;

  constructor() {
    this.isShort = false;
    this.timeOutId = 0;
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onPointerDown(event: Event): void {
    this.isShort = true;
    this.longPressTriggered = false;

    if (event instanceof TouchEvent) {
      const touch = event.touches[0];
      this.element = document.elementFromPoint(touch.pageX, touch.pageY);
    }

    this.timeOutId = setTimeout(() => {
      this.longPress.emit();
      this.isShort = false;
      this.longPressTriggered = true;
    }, this.duration());
  }

  @HostListener('touchcancel')
  @HostListener('mouseleave')
  onPointerLeave(): void {
    if (this.timeOutId === -1) return;
    this.clearTimeout();
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  onPointerEnd(event: Event): void {
    if (this.timeOutId === -1) return;
    this.clearTimeout();
    if (this.isShort && !this.longPressTriggered) this.shortPress.emit();
  }

  clearTimeout() {
    clearTimeout(this.timeOutId);
    this.timeOutId = -1;
  }

  @HostListener('touchmove', ['$event'])
  touchMove(event: TouchEvent) {
    if (this.timeOutId === -1) return;

    const touch = event.touches[0];
    if (this.element !== document.elementFromPoint(touch.pageX, touch.pageY)) {
      this.clearTimeout();
    }
  }
}
