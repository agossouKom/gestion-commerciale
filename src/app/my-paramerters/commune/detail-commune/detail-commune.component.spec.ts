import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCommuneComponent } from './detail-commune.component';

describe('DetailCommuneComponent', () => {
  let component: DetailCommuneComponent;
  let fixture: ComponentFixture<DetailCommuneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCommuneComponent]
    });
    fixture = TestBed.createComponent(DetailCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
