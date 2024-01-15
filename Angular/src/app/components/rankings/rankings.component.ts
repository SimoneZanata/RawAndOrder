import { Component, Injectable, Input, OnChanges} from '@angular/core';
import { Player} from 'src/app/models/user';

@Injectable({
  providedIn: "root",
})

@Component({
  selector: 'tnv-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnChanges {

  @Input() players: Player[] =[];
  sortKey = 'points';
  sortDesc = false;
  

  constructor(){}

  ngOnChanges(): void {
    this.sortDesc = false;
    this.sortPlayers();
  }

  sortPlayers() {
    this.sortDesc = !this.sortDesc;
    this.players = this.players?.sort((b: any, a: any) => {
      return (this.sortDesc ? -1 : 1) * (Number(b.points) - Number(a.points));
    });
  }    
}  
