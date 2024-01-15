import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'tnv-page-review-item-details',
  templateUrl: './page-review-item-details.component.html',
  styleUrls: ['./page-review-item-details.component.scss']
})
export class PageReviewItemDetailsComponent implements OnInit{
  movieId: number = 0;
  currentUser!: User;  
  
  constructor(public reviewsService:ReviewService,private activatedRoute: ActivatedRoute,
    private authService:AuthService){

  }
  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.params['movieId'];
    this.reviewsService.getReview(this.authService.getCurrentUser().id, this.movieId)
  }
}
