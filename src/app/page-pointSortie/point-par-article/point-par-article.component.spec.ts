import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointParArticleComponent } from './point-par-article.component';

describe('PointParArticleComponent', () => {
  let component: PointParArticleComponent;
  let fixture: ComponentFixture<PointParArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointParArticleComponent]
    });
    fixture = TestBed.createComponent(PointParArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
