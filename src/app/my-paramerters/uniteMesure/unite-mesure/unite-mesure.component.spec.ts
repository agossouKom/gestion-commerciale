import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteMesureComponent } from './unite-mesure.component';

describe('UniteMesureComponent', () => {
  let component: UniteMesureComponent;
  let fixture: ComponentFixture<UniteMesureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniteMesureComponent]
    });
    fixture = TestBed.createComponent(UniteMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
