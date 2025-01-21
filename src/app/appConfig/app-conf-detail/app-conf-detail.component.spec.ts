import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConfDetailComponent } from './app-conf-detail.component';

describe('AppConfDetailComponent', () => {
  let component: AppConfDetailComponent;
  let fixture: ComponentFixture<AppConfDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppConfDetailComponent]
    });
    fixture = TestBed.createComponent(AppConfDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
