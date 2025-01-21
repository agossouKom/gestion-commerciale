import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSortieComponent } from './detail-sortie.component';

describe('DetailSortieComponent', () => {
  let component: DetailSortieComponent;
  let fixture: ComponentFixture<DetailSortieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSortieComponent]
    });
    fixture = TestBed.createComponent(DetailSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
