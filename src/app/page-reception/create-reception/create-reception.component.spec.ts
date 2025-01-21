import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReceptionComponent } from './create-reception.component';

describe('CreateReceptionComponent', () => {
  let component: CreateReceptionComponent;
  let fixture: ComponentFixture<CreateReceptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateReceptionComponent]
    });
    fixture = TestBed.createComponent(CreateReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
