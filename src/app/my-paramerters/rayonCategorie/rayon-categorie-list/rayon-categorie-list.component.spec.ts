import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RayonCategorieListComponent } from './rayon-categorie-list.component';

describe('RayonCategorieListComponent', () => {
  let component: RayonCategorieListComponent;
  let fixture: ComponentFixture<RayonCategorieListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RayonCategorieListComponent]
    });
    fixture = TestBed.createComponent(RayonCategorieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
