import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRayonComponent } from './add-rayon.component';

describe('AddRayonComponent', () => {
  let component: AddRayonComponent;
  let fixture: ComponentFixture<AddRayonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRayonComponent]
    });
    fixture = TestBed.createComponent(AddRayonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
