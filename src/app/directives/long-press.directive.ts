import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appLongPress]',
})
export class LongPressDirective {
  @Input() duration = 250;
  startTime: number;
  @Output() longPressed = new EventEmitter<void>();

  constructor() {
    this.startTime = 0;
  }

  @HostListener('mousedown') onMouseDown() {
    this.startTime = Date.now();
  }

  @HostListener('mouseup') onMouseUp() {
    const elapsedTime = Date.now() - this.startTime;

    if (elapsedTime >= this.duration) {
      this.longPressed.emit();
    }
  }
}
