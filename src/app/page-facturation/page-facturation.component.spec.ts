import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFacturationComponent } from './page-facturation.component';

describe('PageFacturationComponent', () => {
  let component: PageFacturationComponent;
  let fixture: ComponentFixture<PageFacturationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFacturationComponent]
    });
    fixture = TestBed.createComponent(PageFacturationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
