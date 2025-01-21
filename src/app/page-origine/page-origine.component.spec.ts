import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOrigineComponent } from './page-origine.component';

describe('PageOrigineComponent', () => {
  let component: PageOrigineComponent;
  let fixture: ComponentFixture<PageOrigineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageOrigineComponent]
    });
    fixture = TestBed.createComponent(PageOrigineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
