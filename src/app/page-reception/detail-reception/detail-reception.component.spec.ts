import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReceptionComponent } from './detail-reception.component';

describe('DetailReceptionComponent', () => {
  let component: DetailReceptionComponent;
  let fixture: ComponentFixture<DetailReceptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailReceptionComponent]
    });
    fixture = TestBed.createComponent(DetailReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
