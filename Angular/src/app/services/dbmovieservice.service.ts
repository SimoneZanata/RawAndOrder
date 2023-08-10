import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class DbmoviesService {

  private movieUrl='https://api.themoviedb.org/3/movie';
  private moviesListUrl = 'https://api.themoviedb.org/3/account/20163434/favorite/movies'; 
  private accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWZkMTQwMTIyMjk5NTJjYmM0MTdhODlmMTRlN2RiNSIsInN1YiI6IjY0YjVhZTcyMTIxOTdlMDExY2FhY2ZiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OWEBq_hwChC-lORkrz1jciSgvD313Y5L9nuwPpvtGEI';
  
  movies:Movie[]=[];
  movie: Movie = {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
    catch: false,
  };

  constructor(private http: HttpClient) { 
  }

  getMovies() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get<Movie[]>(this.moviesListUrl, { headers }).subscribe({
      next: (res:any) => {
        this.movies = (res.results);
        console.log('film recuperati:', this.movies);
      },
      error: (error : any) => {
        console.error('Si è verificato un errore nel recupero dei film:', error);
      }
    });
  };
  

  getMovie(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get<Movie>(`${this.movieUrl}/${id}`, { headers }).subscribe({
      next: (res: Movie) => {
        this.movie = res;
        console.log('film recuperato\'API:', this.movie);
      },
      error: (error: any) => {
        console.error('Si è verificato un errore nel recupero del film:', error);
      }
    });
  };
}

