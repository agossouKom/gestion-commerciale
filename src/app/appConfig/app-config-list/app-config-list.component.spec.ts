import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConfigListComponent } from './app-config-list.component';

describe('AppConfigListComponent', () => {
  let component: AppConfigListComponent;
  let fixture: ComponentFixture<AppConfigListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppConfigListComponent]
    });
    fixture = TestBed.createComponent(AppConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
