import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RikshiComponent } from './rikshi.component';

describe('RikshiComponent', () => {
  let component: RikshiComponent;
  let fixture: ComponentFixture<RikshiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RikshiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RikshiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
