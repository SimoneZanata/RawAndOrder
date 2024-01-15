import { Component, Input, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { Movie } from 'src/app/models/movie';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';

@Component({
  selector: 'tnv-game-results-item-details',
  templateUrl: './game-results-item-details.component.html',
  styleUrls: ['./game-results-item-details.component.scss']
})
export class GameResultsItemDetailsComponent implements OnChanges {
  movieId!: number;
  isFormValid: boolean = false;
  comment: string = '';
  rating: number = 0;
  currentUser!: User;

  @Input() reviewExists: Boolean = false;
  @Input() review = {} as Review;
  @Input() movie = {} as Movie;

  constructor(public reviewService: ReviewService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem("user") || '') as User;
  }


  ngOnChanges(): void {
    this.comment = '';
    this.rating = 0;
    this.isAlreadyFavourite();
  }

  isAlreadyFavourite() {
    if (this.reviewService.reviewExists === true) {
      this.comment = this.review.textComment;
      this.rating = this.review.ratingStars;
    }
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
    this.isFormValid = !!this.comment && !!this.rating;
  }

  
  addToFavorites() {
    this.review = {} as Review;
    this.review.userId = this.currentUser.id;
    this.review.textComment = this.comment;
    this.review.ratingStars = this.rating;
    this.review.movieId = this.movie.id;
    this.review.movieTitle = this.movie.title;
    this.review.movieImg = this.movie.poster_path;
    this.review.movieBackground=this.movie.backdrop_path;
    this.review.movieDescription = this.movie.overview;
    this.review.movieLanguage = this.movie.original_language;
    this.review.movieReleaseDate = this.movie.release_date;
    this.review.movieVoteAverage = this.movie.vote_average;
    this.reviewService.addReview(this.review);
  }
}