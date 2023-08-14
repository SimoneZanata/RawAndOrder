import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReviewItemDetailsComponent } from './page-review-item-details.component';

describe('PageReviewItemDetailsComponent', () => {
  let component: PageReviewItemDetailsComponent;
  let fixture: ComponentFixture<PageReviewItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageReviewItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageReviewItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
