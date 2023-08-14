import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'tnv-page-review-item-details',
  templateUrl: './page-review-item-details.component.html',
  styleUrls: ['./page-review-item-details.component.scss']
})
export class PageReviewItemDetailsComponent {
  movieId: number;
  currentUser!: User;
  
  constructor(public reviewsService:ReviewService,private activatedRoute: ActivatedRoute,
    private authService:AuthService){
    this.currentUser = this.authService.getCurrentUser();
    this.movieId = this.activatedRoute.snapshot.params['movieId'];
    this.reviewsService.getReview(this.currentUser.id, this.movieId)
  }
}
