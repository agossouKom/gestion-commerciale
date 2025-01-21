import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementFactureComponent } from './reglement-facture.component';

describe('ReglementFactureComponent', () => {
  let component: ReglementFactureComponent;
  let fixture: ComponentFixture<ReglementFactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReglementFactureComponent]
    });
    fixture = TestBed.createComponent(ReglementFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
