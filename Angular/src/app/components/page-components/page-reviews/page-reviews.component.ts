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
export class PageReviewsComponent{
  currentUser: User;
 
  constructor (public reviewsService:ReviewService,public authService:AuthService){
   this.currentUser= this.authService.getCurrentUser();   
   this.reviewsService.getReviews(this.currentUser.id);
  }
 
}
