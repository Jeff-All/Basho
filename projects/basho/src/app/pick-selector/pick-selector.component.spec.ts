import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickSelectorComponent } from './pick-selector.component';

describe('PickSelectorComponent', () => {
  let component: PickSelectorComponent;
  let fixture: ComponentFixture<PickSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
