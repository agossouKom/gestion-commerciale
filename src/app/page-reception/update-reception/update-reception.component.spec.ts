import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReceptionComponent } from './update-reception.component';

describe('UpdateReceptionComponent', () => {
  let component: UpdateReceptionComponent;
  let fixture: ComponentFixture<UpdateReceptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateReceptionComponent]
    });
    fixture = TestBed.createComponent(UpdateReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
