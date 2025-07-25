import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListModalComponent } from './edit-list-modal.component';

describe('AddListComponent', () => {
  let component: AddListModalComponent;
  let fixture: ComponentFixture<AddListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddListModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
