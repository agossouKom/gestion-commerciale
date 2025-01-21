import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondVenteComponent } from './cond-vente.component';

describe('CondVenteComponent', () => {
  let component: CondVenteComponent;
  let fixture: ComponentFixture<CondVenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CondVenteComponent]
    });
    fixture = TestBed.createComponent(CondVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
