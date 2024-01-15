import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class GameRepositoryService {
  moviesSortedByUser: Movie[]=[];
  sortedCriteria: string='';
  saveState:boolean=false;

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
    const storedState =localStorage.getItem('saveState');
    if (storedState) {
      this.saveState = JSON.parse(storedState);
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

  setStateFalse(){
   this.saveState=false;
   localStorage.setItem('saveState', JSON.stringify(this.saveState));
  }

  setStateTrue(){
    this.saveState=true;
    localStorage.setItem('saveState', JSON.stringify(this.saveState));
  }


}

