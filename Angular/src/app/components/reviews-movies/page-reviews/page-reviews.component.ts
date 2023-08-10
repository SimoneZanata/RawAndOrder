import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { DbmoviesService } from '../../../services/dbmovieservice.service';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'tnv-page-reviews',
  templateUrl: './page-reviews.component.html',
  styleUrls: ['./page-reviews.component.scss']
})
export class PageReviewsComponent implements OnInit {
  
 
  constructor (public reviewsService:ReviewService,public dbm:DbmoviesService){
   this.reviewsService.getReviews(this.reviewsService.currentUser.id);
  }
  ngOnInit(): void {
    
  }
 

}
