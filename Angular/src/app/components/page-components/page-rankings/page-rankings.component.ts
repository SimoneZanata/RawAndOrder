import { Component } from '@angular/core';
import { RankingsService } from '../../../services/rankings.service';
import { Subscription, switchMap, timer } from 'rxjs';

@Component({
  selector: 'tnv-page-rankings',
  templateUrl: './page-rankings.component.html',
  styleUrls: ['./page-rankings.component.scss']
})
export class PageRankingsComponent {
  subscription!: Subscription;
  constructor(public rankingsService:RankingsService){
  }

  ngOnInit(){
    this.subscription = timer(0,60000).pipe(
      switchMap(async () => this.rankingsService.getAllUsers())
    ).subscribe();
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
