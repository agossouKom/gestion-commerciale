import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDepartementComponent } from './detail-departement.component';

describe('DetailDepartementComponent', () => {
  let component: DetailDepartementComponent;
  let fixture: ComponentFixture<DetailDepartementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDepartementComponent]
    });
    fixture = TestBed.createComponent(DetailDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
