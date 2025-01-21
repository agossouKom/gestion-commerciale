import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSiteComponent } from './detail-site.component';

describe('DetailSiteComponent', () => {
  let component: DetailSiteComponent;
  let fixture: ComponentFixture<DetailSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSiteComponent]
    });
    fixture = TestBed.createComponent(DetailSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
