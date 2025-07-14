import { EventEmitter } from '@angular/core';

export interface Modal<T> {
  closed: EventEmitter<void>;
  confirmed: EventEmitter<T>;
}
