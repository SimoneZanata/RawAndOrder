import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Review } from 'src/app/models/review';

@Injectable({
  providedIn: 'root',
})

export class ReviewService {
  springBootUrl = 'http://localhost:8080/reviews';

  reviews: Review[] = [];

  reviewExists: Boolean = false;
  review: Review = {} as Review;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  checkReview(userId: number, movieId: number) {
    this.reviewExists = false;
    this.httpClient.get<boolean>(`${this.springBootUrl}/users/${userId}/movies/${movieId}/existsReview`, { withCredentials: true }).subscribe({
      next: (res: boolean) => {
        this.reviewExists = res;
        if (res === true) {
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
    this.httpClient.get<Review[]>(`${this.springBootUrl}/users/${userId}`, { withCredentials: true }).subscribe({
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
    this.httpClient.get<Review>(`${this.springBootUrl}/users/${userId}/movies/${movieId}`, { withCredentials: true }).subscribe({
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
    this.httpClient.post<any>(`${this.springBootUrl}`, rating, { withCredentials: true }).subscribe({
      next: (rating) => {
        this.reviews = [...this.reviews, rating.data]
        this.router.navigateByUrl("/result"); 
        setTimeout(() => {
         alert('Recensione aggiunta con successo');
       }, 200);
      },
      error: (error) => {
        console.error('Errore durante l\'inserimento della recensione:', error);
        setTimeout(() => {
          alert('Errore durante l\'inserimento della recensione:');
        }, 200);
      }
    });
  }

  editReview(review: Review) {
    this.httpClient.put<Review>(`${this.springBootUrl}/${review.id}`, review, { withCredentials: true })
      .pipe(
        switchMap(async () => this.getReview(review.userId, review.movieId))
      )
      .subscribe({
        next: () => {
          this.reviews = this.reviews.map(x =>
            x.id === review.id ? review : x
          );
          this.router.navigateByUrl("/reviews");
          setTimeout(() => {
            alert('Recensione aggiornata con successo');
          }, 200);
        },
        error: (error) => {
          console.error('Errore durante l\'aggiornamento della recensione:', error);
          setTimeout(() => {
            alert('Errore durante l\'aggiornamento della recensione');
          }, 200);
        }
      });
  }

  deleteReview(idRating: number) {
    this.httpClient.delete(`${this.springBootUrl}/${idRating}`, { withCredentials: true }).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(x => x.id !== idRating)
        setTimeout(() => {
          alert('Recensione cancellata con successo');
        }, 200);
      },
      error: (error) => {
        console.error('Errore durante la cancellazione della recensione:', error);
        setTimeout(() => {
          alert('Errore durante l\'aggiornamento della recensione');
        }, 200);
      }
    });
  }

}