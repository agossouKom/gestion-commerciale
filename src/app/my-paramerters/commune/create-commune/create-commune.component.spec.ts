import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommuneComponent } from './create-commune.component';

describe('CreateCommuneComponent', () => {
  let component: CreateCommuneComponent;
  let fixture: ComponentFixture<CreateCommuneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCommuneComponent]
    });
    fixture = TestBed.createComponent(CreateCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
