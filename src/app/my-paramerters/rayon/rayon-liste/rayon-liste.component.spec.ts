import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RayonListeComponent } from './rayon-liste.component';

describe('RayonListeComponent', () => {
  let component: RayonListeComponent;
  let fixture: ComponentFixture<RayonListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RayonListeComponent]
    });
    fixture = TestBed.createComponent(RayonListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
