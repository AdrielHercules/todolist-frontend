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

  constructor() {
    this.isShort = false;
    this.timeOutId = 0;
  }

  @HostListener('pointerdown')
  onPointerDown(): void {
    this.isShort = true;

    //Comprobamos si efectivamente es una pulsación larga
    this.timeOutId = setTimeout(() => {
      this.longPress.emit();
      this.isShort = false;
    }, this.duration());
  }

  @HostListener('pointerup')
  @HostListener('pointerleave')
  @HostListener('pointercancel')
  onPointerEnd(): void {
    if (this.timeOutId === -1) return;
    clearTimeout(this.timeOutId);
    if (this.isShort) this.shortPress.emit();
    this.timeOutId = -1;
  }
}
