import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConditionnementventComponent } from './detail-conditionnementvent.component';

describe('DetailConditionnementventComponent', () => {
  let component: DetailConditionnementventComponent;
  let fixture: ComponentFixture<DetailConditionnementventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailConditionnementventComponent]
    });
    fixture = TestBed.createComponent(DetailConditionnementventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
