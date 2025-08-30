import { AfterViewInit, Component, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { List } from '../models/list';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../core/modals/modal/modal.component';
import { listIcons } from '../models/list-icons';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-list',
  imports: [FormsModule, NgClass],
  templateUrl: './edit-list-modal.component.html',
})
export class EditListModalComponent extends ModalComponent<Partial<List>> implements OnInit, AfterViewInit {
  inputList = input<List>();

  protected title: string;
  protected confirmButtonText: string;

  private id?: string;
  protected name: string;
  protected icon: string;
  protected showIcons: boolean;

  protected invalidName: boolean;

  private nameInputField = viewChild<ElementRef<HTMLInputElement>>('inputName');

  protected icons: string[] = listIcons;
  protected isClosing: boolean;

  constructor() {
    super();

    this.title = 'Crear una lista';
    this.confirmButtonText = 'CREAR';
    this.name = '';
    this.icon = '📋';
    this.showIcons = false;
    this.invalidName = false;

    this.isClosing = false;
  }

  ngOnInit(): void {
    const inputList = this.inputList();

    if (inputList === undefined) return;

    this.title = 'Editar una lista';
    this.confirmButtonText = 'EDITAR';
    this.id = inputList.id;
    this.name = inputList.name;
    this.icon = inputList.icon;
  }

  override ngAfterViewInit() {
    this.nameInputField()?.nativeElement.focus();
  }

  onCreateClick() {
    if (this.name === '') {
      this.invalidName = true;
      this.nameInputField()?.nativeElement.focus();
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
    }
  }

  onIconClicked(icon: string) {
    this.icon = icon;
    this.showIcons = false;
  }

  onInputChange(text: Event) {
    this.name = String(text);
    if (this.name !== '') this.invalidName = false;
  }
}
