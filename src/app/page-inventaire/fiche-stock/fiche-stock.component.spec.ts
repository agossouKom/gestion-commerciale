import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheStockComponent } from './fiche-stock.component';

describe('FicheStockComponent', () => {
  let component: FicheStockComponent;
  let fixture: ComponentFixture<FicheStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheStockComponent]
    });
    fixture = TestBed.createComponent(FicheStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
