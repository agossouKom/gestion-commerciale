import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPaysComponent } from './detail-pays.component';

describe('DetailPaysComponent', () => {
  let component: DetailPaysComponent;
  let fixture: ComponentFixture<DetailPaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPaysComponent]
    });
    fixture = TestBed.createComponent(DetailPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
