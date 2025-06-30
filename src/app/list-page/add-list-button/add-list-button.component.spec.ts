import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListButtonComponent } from './add-list-button.component';

describe('AddListButtonComponent', () => {
  let component: AddListButtonComponent;
  let fixture: ComponentFixture<AddListButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddListButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
