import {
  computed,
  DestroyRef,
  Directive,
  effect,
  HostListener,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';

@Directive({
  selector: '[appLongPress]',
})
export class LongPressDirective {
  duration = input.required<number>({
    alias: 'appLongPressDuration',
  });

  private readonly validDuration = computed(() => Math.max(0, this.duration()));

  disabled = input(false, {
    alias: 'appLongPressDisabled',
  });

  /*Vamos a declarar señales que emiten datos*/
  longPressStart = output<void>();
  appLongPressed = output<void>();
  longPressCancel = output<void>();

  /*Estado interno reactivo con señales */
  private readonly timeOutId = signal<ReturnType<typeof setTimeout> | null>(null);

  private readonly isPressing = signal(false);
  private readonly hasLongPressCompleted = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Esto previene fugas de memoria si el componente desaparece mientras hay un temporizador activo.
    destroyRef.onDestroy(() => this.clearTimeOut());

    // Creamos un "efecto" que se ejecuta automáticamente cuando una de las señales que lee cambia.
    effect(() => {
      if (this.disabled()) {
        // ...cancelamos cualquier pulsación en curso. Usamos `untracked` para evitar
        // que el `effect` dependa de las señales leídas dentro de `cancelPress`.
        untracked(() => this.cancelPress());
      }
    });
  }
  //Manejamops los eventos del host

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    //Si no está activo o no es click derecho nos salimos
    if (this.disabled() || event.button !== 0) return;
    //  event.preventDefault();
    this.clearTextSelection();

    this.isPressing.set(true);
    this.longPressStart.emit();

    //Comprobamos si efectivamente es una pulsación larga
    const timeout = setTimeout(() => {
      if (timeout != null && this.isPressing()) {
        this.hasLongPressCompleted.set(true);
        this.appLongPressed.emit();
      }
    }, this.duration());

    //guardamos la información del timeout para poder eliminarla luego
    this.timeOutId.set(timeout);
  }

  @HostListener('pointerup')
  @HostListener('pointerleave')
  @HostListener('pointercancel')
  onPointerEnd(): void {
    this.cancelPress();
  }

  @HostListener('contexmenu', ['$event'])
  protected preventDefault(event: Event): void {
    if (this.isPressing()) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private clearTextSelection(): void {
    try {
      window.getSelection()?.removeAllRanges();
    } catch (e) {
      console.log(e);
    }
  }

  private resetState() {
    this.isPressing.set(false);
    this.hasLongPressCompleted.set(false);
  }

  private clearTimeOut(): void {
    const timeout = this.timeOutId();
    if (timeout != null) {
      clearTimeout(timeout);
      this.timeOutId.set(null);
    }
  }

  private cancelPress = (): void => {
    if (!this.isPressing()) return;

    this.clearTimeOut();

    if (!this.hasLongPressCompleted()) this.longPressCancel.emit();

    this.resetState();
  };
}
