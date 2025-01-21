import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaysComponent } from './update-pays.component';

describe('UpdatePaysComponent', () => {
  let component: UpdatePaysComponent;
  let fixture: ComponentFixture<UpdatePaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePaysComponent]
    });
    fixture = TestBed.createComponent(UpdatePaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
