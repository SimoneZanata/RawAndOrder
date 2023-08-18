import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';
import { Movie } from 'src/app/models/movie';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/@core/services/auth.service';
import { RankingsService } from 'src/app/services/rankings.service';
import { GameRepositoryService } from 'src/app/services/game-repository.service';

@Component({
  selector: 'tnv-game-results',
  templateUrl:'./game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent implements OnInit {
  movie!: Movie | undefined;
  currentCriteria!:any;
  sortedCriteria = this.gameRepository.getSortedCriteria();
  sortedMoviesByUser = this.gameRepository.getMoviesByUser();
  sortedMoviesByCalculator = [...this.sortedMoviesByUser];
  currentUser: User;
  gameSessionPoints:number = 0;

  constructor(public gameRepository: GameRepositoryService, private router: Router,
    private rankService: RankingsService,private authService: AuthService) {
    this.currentUser= this.authService.getCurrentUser();
       
  }  
  
  ngOnInit() {
    this.compareMovies(this.sortedMoviesByUser, this.sortedMoviesByCalculator);
  }

  getFormattedCriteria(movie: Movie): string {
    if (this.sortedCriteria === "popolarità") {
      return `${movie?.popularity.toFixed(0)} recensioni ricevute`;
    } else{   
      return `${movie?.release_date}`;
    }  
  }


  //Funzione per ordinare i film in base al criterio sortato.
  sortMovies(movies: Movie[]): Movie[] { 
    if (this.sortedCriteria === "data d'uscita") {
      movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    } else if (this.sortedCriteria === "popolarità") {
      movies.sort((a, b) => b.popularity - a.popularity);
    }
    return movies;
  }

  /*funzione per mandare in comparazione l'array elaborato dall'utente e l'array ordinato in base ai veri dati.
  In base ai riscontri si assegnano i punti*/
  compareMovies(sortedMoviesByUser: Movie[], sortedMoviesByCalculator: Movie[]) {
    let count: number = 0;
    this.sortMovies(sortedMoviesByCalculator);

    for (let i = 0; i < sortedMoviesByCalculator.length; i++) {
      if (sortedMoviesByCalculator[i].id === sortedMoviesByUser[i].id) {
        count++;
        sortedMoviesByCalculator[i].catch = true;
      }
    }
    this.gameSessionPoints = count * 10;
    this.rankService.addPointsUser(this.gameSessionPoints);
  }
  

  showCards(){
    this.gameRepository.setStateTrue();
  }

  onClicked(id: number) {
    this.router.navigateByUrl(`movie/${id}`);
  }
}