import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { DbmoviesService } from '../../../services/dbmovieservice.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'tnv-page-reviews',
  templateUrl: './page-reviews.component.html',
  styleUrls: ['./page-reviews.component.scss']
})
export class PageReviewsComponent implements OnInit{
 
 
  constructor (public reviewsService:ReviewService,public authService:AuthService){
  }
  ngOnInit(): void {
    this.reviewsService.getReviews(this.authService.getCurrentUser().id);
  }
}
