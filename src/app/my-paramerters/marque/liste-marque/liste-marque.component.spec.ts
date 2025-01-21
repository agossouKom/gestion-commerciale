import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMarqueComponent } from './liste-marque.component';

describe('ListeMarqueComponent', () => {
  let component: ListeMarqueComponent;
  let fixture: ComponentFixture<ListeMarqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeMarqueComponent]
    });
    fixture = TestBed.createComponent(ListeMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
