import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEntreeComponent } from './detail-entree.component';

describe('DetailEntreeComponent', () => {
  let component: DetailEntreeComponent;
  let fixture: ComponentFixture<DetailEntreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailEntreeComponent]
    });
    fixture = TestBed.createComponent(DetailEntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
