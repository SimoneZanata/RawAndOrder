import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { switchMap } from 'rxjs';
import { Review } from 'src/app/models/review';

@Injectable({
  providedIn: 'root',
})

export class ReviewService {
  API_ROOT = 'http://localhost:1234/api';

  reviews: Review []=[];

  reviewExists: Boolean =false;

  review: Review = {
    idRating: 0,
    userId: 0,
    ratingStars: 0,
    textComment: '',
    timestamp: new Date(),
    movieId: 0,
    movieTitle: '',
    movieImg: '',
    movieBackground:'',
    movieDescription: '',
    movieLanguage: '',
    movieReleaseDate: '',
    movieVoteAverage: 0,
  };

  constructor(private httpClient: HttpClient) {
  }

  checkReview(userId: number, movieId: number) {
    this.httpClient.get<{ exists: boolean }>(`${this.API_ROOT}/ratings/search/${userId}/${movieId}`).subscribe({
      next: (res: { exists: boolean }) => {
        this.reviewExists = res.exists; 
      if(res.exists===true){
        this.getReview(userId, movieId)
        console.log('Esiste una recensione:', this.review);
        }
      },   
      error: (error: any) => {
        console.log('Errore nella verifica della recensione o problema col server:', error);
      }
    });
  }

  
  getReviews(userId: number) {
    this.reviews = []
    this.httpClient.get<Review[]>(`${this.API_ROOT}/ratings/${userId}`).subscribe({
      next: (res: Review[]) => {
        this.reviews = res;
        console.log('Lista recensioni recuperata:', this.reviews);
      },
      error: (error: any) => {
        console.log('Errore nel recupero dei dati', error);
      }
    });
  }

  getReview(userId: number, movieId: number) {
    this.httpClient.get<Review>(`${this.API_ROOT}/ratings/${userId}/${movieId}`).subscribe({
      next: (res: Review) => {
        this.review = res;
        console.log('recensione recuperata:', this.review);
      },
      error: (error: 404) => {
        console.log('recensione non trovata o problemi col server', error);
      }
    });
  };
  

  addReview(rating: Review) {
    this.httpClient.post<any>(`${this.API_ROOT}/ratings/`, rating).subscribe({
      next: (rating) => {
        this.reviews=[...this.reviews,rating.data]
      },
        error: (error) => {
          console.error('Errore durante l\'inserimento della recensione:', error);
        console.log(this.review)}
    });
  }


  editReview(rating: Review) {
    this.httpClient.put<Review>(`${this.API_ROOT}/ratings/${rating.idRating}`, rating)
      .pipe(
        switchMap(async () => this.getReview(rating.userId, rating.movieId))
      )
      .subscribe({
        next: () => {
          this.reviews = this.reviews.map(x =>
            x.idRating === rating.idRating ? rating : x
          );
        },
        error: (error) => {
          console.error('Errore durante l\'aggiornamento della recensione:', error);
        }
      });
  }


  deleteReview(idRating: number) {
   this.httpClient.delete(`${this.API_ROOT}/ratings/${idRating}`).subscribe({
      next:  () => {this.reviews = this.reviews.filter(x => x.idRating !== idRating)
      },
        error: (error) => {
          console.error('Errore durante la cancellazione della recensione:', error);
        }
      });
  }

}