import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvebtaireComponent } from './invebtaire.component';

describe('InvebtaireComponent', () => {
  let component: InvebtaireComponent;
  let fixture: ComponentFixture<InvebtaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvebtaireComponent]
    });
    fixture = TestBed.createComponent(InvebtaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
