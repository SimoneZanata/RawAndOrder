import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReviewService } from '../../../@shared/services/review.service';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'tnv-reviews-main',
  templateUrl: './reviews-main.component.html',
  styleUrls: ['./reviews-main.component.scss']
})

  
export class ReviewsMainComponent implements OnChanges{
 
 @Input() reviews: Review[]=[];
  rating :number =0;
  review!: Review;
  currentUser = JSON.parse(localStorage.getItem('user') || '{}') as User;

  constructor(private reviewService: ReviewService, private router:Router){        
  }
 
  
  ngOnChanges(): void { 
    this.reviews;  
  }

  onDeleteClicked(id: number){
    this.reviewService.deleteReview(id);
    setTimeout(() => {
      alert('Recensione cancellata con successo');
    }, 100);
  }

  onEditClicked(movieId: number) {
    this.router.navigateByUrl(`reviews/${this.currentUser.id}/${movieId}`);
  }

  onImgClicked(movieId: number){
    this.router.navigateByUrl(`movie/${movieId}`);
  }
}