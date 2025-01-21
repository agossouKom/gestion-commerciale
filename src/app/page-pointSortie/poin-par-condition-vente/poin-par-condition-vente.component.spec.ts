import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoinParConditionVenteComponent } from './poin-par-condition-vente.component';

describe('PoinParConditionVenteComponent', () => {
  let component: PoinParConditionVenteComponent;
  let fixture: ComponentFixture<PoinParConditionVenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoinParConditionVenteComponent]
    });
    fixture = TestBed.createComponent(PoinParConditionVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
