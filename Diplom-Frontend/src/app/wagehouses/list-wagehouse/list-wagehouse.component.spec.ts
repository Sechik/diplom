import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWagehouseComponent } from './list-wagehouse.component';

describe('ListWagehouseComponent', () => {
  let component: ListWagehouseComponent;
  let fixture: ComponentFixture<ListWagehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWagehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWagehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
