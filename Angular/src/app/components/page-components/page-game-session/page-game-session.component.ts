import { Component, OnInit } from '@angular/core';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';

@Component({
  selector: 'tnv-page-game-session',
  templateUrl:'./page-game-session.component.html',
  styleUrls: ['./page-game-session.component.scss']
})
export class PageGameSessionComponent implements OnInit{
  constructor(public dbmoviesService: DbmoviesService){
}  
  ngOnInit(): void {
    this.dbmoviesService.getMovies();
  }

}
