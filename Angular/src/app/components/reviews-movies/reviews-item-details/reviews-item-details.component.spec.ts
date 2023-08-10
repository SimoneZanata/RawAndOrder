import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsItemDetailsComponent } from './reviews-item-details.component';

describe('ReviewsItemDetailsComponent', () => {
  let component: ReviewsItemDetailsComponent;
  let fixture: ComponentFixture<ReviewsItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
