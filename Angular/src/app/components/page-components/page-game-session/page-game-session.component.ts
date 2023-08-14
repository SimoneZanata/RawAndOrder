import { Component } from '@angular/core';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';

@Component({
  selector: 'tnv-page-game-session',
  templateUrl:'./page-game-session.component.html',
  styleUrls: ['./page-game-session.component.scss']
})
export class PageGameSessionComponent {
  constructor(public dbmoviesService: DbmoviesService){
    this.dbmoviesService.getMovies();
    
}  
}
