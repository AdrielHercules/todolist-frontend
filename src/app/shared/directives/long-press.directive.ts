import { Directive, HostListener, input, output } from '@angular/core';

@Directive({
  selector: '[appLongPress]',
})
export class LongPressDirective {
  duration = input.required<number>();
  longPress = output<void>();
  shortPress = output<void>();

  private isShort: boolean;
  private timeOutId: number;

  private readonly DISTANCE = 5;
  private originPosition: { x: number; y: number } = { x: 0, y: 0 };
  element: Element | null = null;

  constructor() {
    this.isShort = false;
    this.timeOutId = 0;
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onPointerDown(event: Event): void {
    this.isShort = true;

    if (event instanceof TouchEvent) {
      const touch = event.touches[0];
      this.element = document.elementFromPoint(touch.pageX, touch.pageY);
      this.originPosition.x = touch.pageX;
      this.originPosition.y = touch.pageY;
    }

    this.timeOutId = setTimeout(() => {
      this.longPress.emit();
      this.isShort = false;
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
    event.preventDefault();
    if (this.isShort) this.shortPress.emit();
  }

  clearTimeout() {
    clearTimeout(this.timeOutId);
    this.timeOutId = -1;
  }

  @HostListener('touchmove', ['$event'])
  touchMove(event: TouchEvent) {
    if (this.timeOutId === -1) return;

    const touch = event.touches[0];
    const lastPosition: { x: number; y: number } = { x: touch.pageX, y: touch.pageY };

    const direction: { x: number; y: number } = {
      x: lastPosition.x - this.originPosition.x,
      y: lastPosition.y - this.originPosition.y,
    };

    const distance = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2));
    console.log(distance);
    if (distance > this.DISTANCE) {
      console.log('Canceled by distance');
      this.clearTimeout();
      event.preventDefault();
    }
  }
}
