import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timestamp } from 'rxjs';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { Movie } from 'src/app/models/movie';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';

@Component({
  selector: 'tnv-reviews-item-details',
  templateUrl: './reviews-item-details.component.html',
  styleUrls: ['./reviews-item-details.component.scss']
})
export class ReviewsItemDetailsComponent implements OnInit {

  movieId: number;
  currentUser!: User;
  comment: string = '';
  rating: number = 0 ;
  isFavorite: boolean = false;
  isFormValid: boolean = false;
  copyComment: string = '';
  copyRating: number = 0;
 

  constructor(private activatedRoute: ActivatedRoute, public reviewService: ReviewService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem("user") || '') as User;
    this.movieId = this.activatedRoute.snapshot.params['movieId'];

  }
  ngOnInit(): void {
    this.getReview();
    
  }

  getReview(){
    this.reviewService.getReview(this.currentUser.id, this.movieId)
    this.copyRating = this.reviewService.review.ratingStars;
    this.copyComment = this.reviewService.review.textComment;
  }
  



  //funzioni per il check del form
  onRatingChange(value: number) {
    this.rating = value;
    this.reviewService.review.ratingStars = this.rating;
    this.checkFormValidity();
  }

  onCommentChange(event: Event) {
    this.comment = this.reviewService.review.textComment;
    const inputElement = event.target as HTMLTextAreaElement;
    this.comment = inputElement.value;
    this.checkFormValidity();
  }

  checkFormValidity() {
    this.isFormValid = !!this.comment || this.reviewService.review.textComment !== this.comment
      || this.reviewService.review.ratingStars !== this.rating;
  }


  updateReview() {
  const commentChanged =  this.copyComment !== this.reviewService.review.textComment;
  const ratingChanged = this.copyRating !== this.reviewService.review.ratingStars;

    if (!commentChanged && !ratingChanged) {
      alert('Il commento e il rating sono identici a quelli iniziali');
      return;
    }
    // Almeno uno tra il commento e il rating è stato modificato
    

    this.reviewService.editReview(this.reviewService.review);
    this.router.navigateByUrl("/reviews");
    setTimeout(() => {
      alert('Recensione aggiornata con successo');
    }, 200);
  }
}


