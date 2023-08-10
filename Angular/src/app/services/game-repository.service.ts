import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class GameRepositoryService {
  moviesSortedByUser: Movie[]=[];
  sortedCriteria: string='';

  constructor() { 
    this.loadFromLocalStorage();
  }



  loadFromLocalStorage() {
    const storedMovies = localStorage.getItem('moviesSortedByUser');
    if (storedMovies) {
      this.moviesSortedByUser = JSON.parse(storedMovies);
    }
    const storedCriteria = localStorage.getItem('sortedCriteria');
    if (storedCriteria) {
      this.sortedCriteria = storedCriteria;
    }
  }
 
  setMoviesByUser(movies: Movie[]) {
    this.moviesSortedByUser = movies;
    localStorage.setItem('moviesSortedByUser', JSON.stringify(this.moviesSortedByUser));
  }
  getMoviesByUser() {
    return this.moviesSortedByUser; 
  }

  setSortedCriteria(criteria: string) {
    this.sortedCriteria = criteria;
    localStorage.setItem('sortedCriteria', this.sortedCriteria);
  }
  getSortedCriteria(){
    return this.sortedCriteria;
  }
}

