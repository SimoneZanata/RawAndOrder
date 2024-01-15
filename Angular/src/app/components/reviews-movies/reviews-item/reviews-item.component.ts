import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'tnv-reviews-item',
  templateUrl: './reviews-item.component.html',
  styleUrls: ['./reviews-item.component.scss']
})
export class ReviewsItemComponent {
  @Input() review!: Review;
  @Output() deleteClicked = new EventEmitter<number>();
  @Output() editClicked = new EventEmitter<number>();
  @Output() imgClicked = new EventEmitter<number>();

  constructor() {
  }

  deleteClick() {
    this.deleteClicked.emit(this.review.id)
  }

  editClick() {
    this.editClicked.emit(this.review.movieId);
  }
  
  imgClick(){
    this.imgClicked.emit(this.review.movieId)
  }
}
