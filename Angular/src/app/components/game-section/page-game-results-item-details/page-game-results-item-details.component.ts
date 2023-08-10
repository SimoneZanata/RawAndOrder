import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';
import { __runInitializers } from 'tslib';

@Component({
  selector: 'tnv-page-game-results-item-details',
  templateUrl: './page-game-results-item-details.component.html',
  styleUrls: ['./page-game-results-item-details.component.scss']
})
export class PageGameResultsItemDetailsComponent implements OnInit{
  movieId: number;

  constructor(public dbMoviesService:DbmoviesService, public reviewsService: ReviewService,
    private activatedRoute: ActivatedRoute){
    this.movieId = this.activatedRoute.snapshot.params['movieId'];
    
    
}
  ngOnInit(): void {
      this.dbMoviesService.getMovie(this.movieId);
      this.reviewsService.checkReview(this.reviewsService.currentUser.id,this.movieId);
    
  }
}
