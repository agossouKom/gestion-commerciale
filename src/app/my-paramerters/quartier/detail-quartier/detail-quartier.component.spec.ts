import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailQuartierComponent } from './detail-quartier.component';

describe('DetailQuartierComponent', () => {
  let component: DetailQuartierComponent;
  let fixture: ComponentFixture<DetailQuartierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailQuartierComponent]
    });
    fixture = TestBed.createComponent(DetailQuartierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
