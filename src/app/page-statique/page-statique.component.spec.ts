import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStatiqueComponent } from './page-statique.component';

describe('PageStatiqueComponent', () => {
  let component: PageStatiqueComponent;
  let fixture: ComponentFixture<PageStatiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageStatiqueComponent]
    });
    fixture = TestBed.createComponent(PageStatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
