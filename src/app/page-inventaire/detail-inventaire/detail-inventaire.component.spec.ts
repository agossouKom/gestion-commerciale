import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInventaireComponent } from './detail-inventaire.component';

describe('DetailInventaireComponent', () => {
  let component: DetailInventaireComponent;
  let fixture: ComponentFixture<DetailInventaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailInventaireComponent]
    });
    fixture = TestBed.createComponent(DetailInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
