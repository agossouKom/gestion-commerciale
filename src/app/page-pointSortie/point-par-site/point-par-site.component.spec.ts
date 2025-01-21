import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointParSiteComponent } from './point-par-site.component';

describe('PointParSiteComponent', () => {
  let component: PointParSiteComponent;
  let fixture: ComponentFixture<PointParSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointParSiteComponent]
    });
    fixture = TestBed.createComponent(PointParSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
