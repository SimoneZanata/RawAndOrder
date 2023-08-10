import { Component, Input, OnInit } from '@angular/core';
import { DbmoviesService } from '../../../services/dbmovieservice.service';
import { Movie} from '../../../models/movie';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { GameRepositoryService } from 'src/app/services/game-repository.service';


@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.scss'],
  
})
export class GameSessionComponent implements OnInit {


  movies!: Movie[] ;
  criteria:String[]=["popolarità","data d'uscita"]; 
  sortedCriteria =this.shuffleArray(this.criteria)[0];
  isSubmitPressed: boolean = false;

  constructor(public dbmoviesService: DbmoviesService, private gameRepository: GameRepositoryService, private router: Router) {
  }

  ngOnInit() {
    this.getMovies();
    this.movies = this.shuffleArray(this.dbmoviesService.movies).slice(0,10);
  }

   shuffleArray(array: any []) {
    return array.sort(()=> Math.random()-0.5);
  }
//Funzione dove una volta effettuata la chiamata per i movies, si mescolano e prendono solo 10 per il gioco
  getMovies() {
    this.dbmoviesService.getMovies()
    
    
  }

  drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  /*Una volta terminato il gioco, i dati relativi al criterio sortato e l'array elaborato dall'utente
  verranno salvati nello local storage*/
  checkMoviesByUser() {
    this.isSubmitPressed = true;
    this.gameRepository.setMoviesByUser(this.movies);
    this.gameRepository.setSortedCriteria(this.sortedCriteria);
    console.log('film ordinati dal calcolatore', this.movies);
    this.router.navigate(['/result']);
  }
  
}
