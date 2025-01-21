import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategorierayonComponent } from './add-categorierayon.component';

describe('AddCategorierayonComponent', () => {
  let component: AddCategorierayonComponent;
  let fixture: ComponentFixture<AddCategorierayonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategorierayonComponent]
    });
    fixture = TestBed.createComponent(AddCategorierayonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
