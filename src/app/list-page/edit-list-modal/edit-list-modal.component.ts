import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { List } from '../models/list';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../core/modals/modal/modal.component';

@Component({
  selector: 'app-edit-list',
  imports: [FormsModule],
  templateUrl: './edit-list-modal.component.html',
  styleUrl: './edit-list-modal.component.css',
})
export class AddListModalComponent extends ModalComponent<Partial<List>> implements AfterViewInit {
  protected name = '';
  protected icon = '📋';
  protected showIcons = false;

  private inputName = viewChild<ElementRef<HTMLInputElement>>('inputName');

  protected icons: string[] = [
    '😀',
    '📋',
    '🕧',
    '💣',
    '🛒',
    '🍐',
    '⭐',
    '🍈',
    '🍎',
    '🎄',
    '😊',
    '🅰️',
    '🏛️',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '🤣',
    '😂',
    '🙂',
    '🙃',
    '🫠',
    '😉',
    '🧼',
    '💼',
    '💊',
    '🎮',
    '🍌',
    '🍇',
    '🍉',
    '🍓',
    '🥝',
    '🍍',
    '🥥',
    '🥑',
    '🌽',
    '🥕',
    '🏠',
    '🏡',
    '🏢',
    '🏬',
    '🏫',
    '🏥',
    '🏦',
    '🧠',
    '🫀',
    '🫁',
    '🦴',
    '🦷',
    '📅',
    '📆',
    '🕒',
    '⏰',
    '🗓️',
    '✏️',
    '🖊️',
    '🖋️',
    '📝',
    '📖',
    '🔒',
    '🔓',
    '🔑',
    '🗝️',
    '❤️',
    '💛',
    '💚',
    '💙',
    '💜',
    '🖤',
    '🤍',
    '🤎',
    '🚀',
    '✈️',
    '🚗',
    '🚲',
    '🛴',
    '🛵',
    '🎉',
    '🎊',
    '🎁',
    '🎈',
    '🎂',
    '🍰',
    '⚽',
    '🏀',
    '🏈',
    '⚾',
    '🎾',
    '🏐',
    '🏉',
  ];

  protected isClosing: boolean;

  constructor() {
    super();
    this.isClosing = false;
  }

  override ngAfterViewInit() {
    this.inputName()?.nativeElement.focus();
  }

  onCreateClick() {
    if (this.name === '' || this.icon == '') {
      return;
    }

    this.confirmed.emit({
      name: this.name,
      icon: this.icon,
    });
  }

  onInputClick() {
    if (this.showIcons) this.showIcons = false;
  }

  close() {
    this.isClosing = true;
  }

  onAnimationEnd(): void {
    if (this.isClosing) {
      this.closed.emit();
      this.isClosing = false;
    }
  }

  onIconClicked(icon: string) {
    this.icon = icon;
    this.showIcons = false;
  }
}
