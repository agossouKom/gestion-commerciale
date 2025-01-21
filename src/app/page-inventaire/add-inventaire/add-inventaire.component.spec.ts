import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventaireComponent } from './add-inventaire.component';

describe('AddInventaireComponent', () => {
  let component: AddInventaireComponent;
  let fixture: ComponentFixture<AddInventaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInventaireComponent]
    });
    fixture = TestBed.createComponent(AddInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
