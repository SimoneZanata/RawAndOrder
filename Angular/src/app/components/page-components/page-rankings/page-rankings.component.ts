import { Component } from '@angular/core';
import { RankingsComponent } from '../../rankings/rankings.component';
import { RankingsService } from '../../../services/rankings.service';

@Component({
  selector: 'tnv-page-rankings',
  templateUrl: './page-rankings.component.html',
  styleUrls: ['./page-rankings.component.scss']
})
export class PageRankingsComponent {
  constructor(public rankingsService:RankingsService){
    this.rankingsService.getAllUsers();
  }

}
