import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWagehouseComponent } from './add-wagehouse.component';

describe('AddWagehouseComponent', () => {
  let component: AddWagehouseComponent;
  let fixture: ComponentFixture<AddWagehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWagehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWagehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
