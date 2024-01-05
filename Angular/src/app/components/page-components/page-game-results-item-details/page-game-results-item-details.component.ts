import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { User } from 'src/app/models/user';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';
import { __runInitializers } from 'tslib';

@Component({
  selector: 'tnv-page-game-results-item-details',
  templateUrl: './page-game-results-item-details.component.html',
  styleUrls: ['./page-game-results-item-details.component.scss']
})
export class PageGameResultsItemDetailsComponent implements OnInit{
  movieId: number =0;
  currentUser:User ={} as User;

  constructor(public dbMoviesService:DbmoviesService, public reviewsService: ReviewService,
    private activatedRoute: ActivatedRoute,private authService: AuthService){
    
  }
  ngOnInit(): void {
    this.currentUser= this.authService.getCurrentUser();   
    this.movieId = this.activatedRoute.snapshot.params['movieId'];
    this.dbMoviesService.getMovie(this.movieId);
    this.reviewsService.checkReview(this.currentUser.id,this.movieId);   
  }

}
