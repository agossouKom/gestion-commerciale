import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReceptionComponent } from './liste-reception.component';

describe('ListeReceptionComponent', () => {
  let component: ListeReceptionComponent;
  let fixture: ComponentFixture<ListeReceptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeReceptionComponent]
    });
    fixture = TestBed.createComponent(ListeReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
