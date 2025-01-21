import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageImpressionComponent } from './page-impression.component';

describe('PageImpressionComponent', () => {
  let component: PageImpressionComponent;
  let fixture: ComponentFixture<PageImpressionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageImpressionComponent]
    });
    fixture = TestBed.createComponent(PageImpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
