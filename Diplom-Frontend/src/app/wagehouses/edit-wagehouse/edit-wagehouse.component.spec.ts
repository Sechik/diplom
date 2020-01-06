import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWagehouseComponent } from './edit-wagehouse.component';

describe('EditWagehouseComponent', () => {
  let component: EditWagehouseComponent;
  let fixture: ComponentFixture<EditWagehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWagehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWagehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
