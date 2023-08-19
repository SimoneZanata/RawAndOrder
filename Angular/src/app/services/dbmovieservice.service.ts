import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class DbmoviesService {

  private movieUrl='https://api.themoviedb.org/3/movie';
  private moviesListUrl = 'https://api.themoviedb.org/3/movie/popular?page=1'; 
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
    const allMovies: Movie[] = []; // Aggiunto array per contenere tutti i film
    const totalPage=3;
    for (let page = 1; page <= totalPage; page++) {
      const pageUrl = `https://api.themoviedb.org/3/movie/popular?page=${page}`;
      this.http.get<Movie[]>(pageUrl, { headers }).subscribe({
        next: (res: any) => {
          const movies = res.results;
          allMovies.push(...movies);
          if (page === totalPage) {
            this.movies = allMovies;
          }
        },
        error: (error: any) => {
          console.error(`Si è verificato un errore nel recupero dei film dalla pagina ${page}:`, error);
        }
      });
    }
  }
  

  getMovie(id: number) {
    this.movie = Object.assign({});
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    this.http.get<Movie>(`${this.movieUrl}/${id}`, { headers }).subscribe({
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

