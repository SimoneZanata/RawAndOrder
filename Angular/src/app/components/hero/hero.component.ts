import { Component } from '@angular/core';
import { ReviewService } from 'src/app/@shared/services/review.service';

@Component({
  selector: 'tnv-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  constructor(public reviewsService: ReviewService) {
  }
}
