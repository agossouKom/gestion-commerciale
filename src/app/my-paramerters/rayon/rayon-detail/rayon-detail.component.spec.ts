import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RayonDetailComponent } from './rayon-detail.component';

describe('RayonDetailComponent', () => {
  let component: RayonDetailComponent;
  let fixture: ComponentFixture<RayonDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RayonDetailComponent]
    });
    fixture = TestBed.createComponent(RayonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
