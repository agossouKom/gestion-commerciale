import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointGlobalComponent } from './point-global.component';

describe('PointGlobalComponent', () => {
  let component: PointGlobalComponent;
  let fixture: ComponentFixture<PointGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointGlobalComponent]
    });
    fixture = TestBed.createComponent(PointGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
