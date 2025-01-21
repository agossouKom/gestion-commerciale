import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppConfigComponent } from './add-app-config.component';

describe('AddAppConfigComponent', () => {
  let component: AddAppConfigComponent;
  let fixture: ComponentFixture<AddAppConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAppConfigComponent]
    });
    fixture = TestBed.createComponent(AddAppConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
