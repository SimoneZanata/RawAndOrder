import { Component, Input, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';

@Component({
  selector: 'tnv-reviews-item-details',
  templateUrl: './reviews-item-details.component.html',
  styleUrls: ['./reviews-item-details.component.scss']
})
export class ReviewsItemDetailsComponent implements OnChanges {
  @Input()  review: Review = {
    idRating: 0,
    userId: 0,
    ratingStars: 0,
    textComment: '',
    timestamp: new Date(),
    movieId: 0,
    movieTitle: '',
    movieImg: '',
    movieDescription: '',
    movieLanguage: '',
    movieReleaseDate: '',
    movieVoteAverage: 0,
  };
  movieId: number=0;
  currentUser!: User;
  comment: string = this.review.textComment;
  rating: number =this.review.ratingStars;
  isFavorite: boolean = false;
  isFormValid: boolean = false;
  copyComment: string = '';
  copyRating: number = 0;
 

  constructor(public reviewService: ReviewService, private router: Router) {
  }
  
  ngOnChanges(): void {
    this.comment=this.review.textComment;
    this.rating=this.review.ratingStars;
    this.copyComment=this.review.textComment
    this.copyRating=this.review.ratingStars
  }
 

  //funzioni per il check del form
  onRatingChange(value: number) {
    this.rating = value;
    this.checkFormValidity();
  }

  onCommentChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.comment = inputElement.value;
    this.checkFormValidity();
  }

  checkFormValidity() {
    if (this.comment == this.copyComment && this.rating==this.copyRating || this.comment=='') {
      this.isFormValid = false;
    } else {
      this.isFormValid = true;
    }
  }

  updateReview() {
    this.review.ratingStars=this.rating;
    this.review.textComment=this.comment;
    this.reviewService.editReview(this.review);
    this.router.navigateByUrl("/reviews");
    setTimeout(() => {
      alert('Recensione aggiornata con successo');
    }, 200);
  }
}


