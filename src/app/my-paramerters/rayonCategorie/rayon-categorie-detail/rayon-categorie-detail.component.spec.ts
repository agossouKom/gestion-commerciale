import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RayonCategorieDetailComponent } from './rayon-categorie-detail.component';

describe('RayonCategorieDetailComponent', () => {
  let component: RayonCategorieDetailComponent;
  let fixture: ComponentFixture<RayonCategorieDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RayonCategorieDetailComponent]
    });
    fixture = TestBed.createComponent(RayonCategorieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
