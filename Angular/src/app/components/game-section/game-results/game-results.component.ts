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

  movie: Movie | undefined;
  sortedCriteria = this.gameRepository.getSortedCriteria();
  sortedMoviesByUser = this.gameRepository.getMoviesByUser();
  sortedMoviesByCalculator = [...this.sortedMoviesByUser];
  currentUser!: User | undefined;
  gameSessionPoints:number = 0;

  constructor(private gameRepository: GameRepositoryService, private router: Router,private rankService: RankingsService) {
    
  }
    
  ngOnInit() {
    this.currentUser=this.rankService.getCurrentUser();
    this.compareMovies(this.sortedMoviesByUser, this.sortedMoviesByCalculator);
  }

  //Funzione per ordinare i film in base al criterio sortato.
  sortMovies(movies: Movie[]) { 
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
    if (this.currentUser) {
      this.addPointsUser(this.currentUser,this.gameSessionPoints);
    }
  }

  addPointsUser(user: User, points: number) {
    this.rankService.addPointsUser(user, user.id,points).subscribe({
      next: (response) => {
        this.currentUser = response;
        console.log('Utente aggiornato', this.currentUser);
        localStorage.setItem("user", JSON.stringify(response));
      },
      error: (error: any) => {
        console.error('Si è verificato un errore nel salvataggio:', error);
      }
    });
  }
  
  onClicked(id: number) {
    this.router.navigateByUrl(`movie/${id}`);
  }
}