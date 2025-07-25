import { AfterViewInit, Component, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { List } from '../models/list';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../core/modals/modal/modal.component';
import { listIcons } from '../models/list-icons';

@Component({
  selector: 'app-edit-list',
  imports: [FormsModule],
  templateUrl: './edit-list-modal.component.html',
  styleUrl: './edit-list-modal.component.css',
})
export class AddListModalComponent extends ModalComponent<Partial<List>> implements OnInit, AfterViewInit {
  inputList = input<List>();

  private id?: string = undefined;
  protected name = '';
  protected icon = '';
  protected showIcons = false;

  private nameInputField = viewChild<ElementRef<HTMLInputElement>>('inputName');

  protected icons: string[] = listIcons;
  protected isClosing: boolean;

  constructor() {
    super();
    this.isClosing = false;
  }

  ngOnInit(): void {
    this.id = this.inputList()?.id;
    this.name = this.inputList()?.name ?? '';
    this.icon = this.inputList()?.icon ?? '📋';
  }

  override ngAfterViewInit() {
    this.nameInputField()?.nativeElement.focus();
  }

  onCreateClick() {
    if (this.name === '' || this.icon == '') {
      return;
    }

    this.confirmed.emit({
      id: this.id,
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
