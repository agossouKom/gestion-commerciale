import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUniteMesureComponent } from './liste-unite-mesure.component';

describe('ListeUniteMesureComponent', () => {
  let component: ListeUniteMesureComponent;
  let fixture: ComponentFixture<ListeUniteMesureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeUniteMesureComponent]
    });
    fixture = TestBed.createComponent(ListeUniteMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
