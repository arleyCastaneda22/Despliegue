import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTurnoComponent } from './add-turno.component';

describe('AddTurnoComponent', () => {
  let component: AddTurnoComponent;
  let fixture: ComponentFixture<AddTurnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTurnoComponent]
    });
    fixture = TestBed.createComponent(AddTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
