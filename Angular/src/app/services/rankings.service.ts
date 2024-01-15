import { HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Player, User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  springBootUrl =
    'http://localhost:8080/users';
  players: Player[] = [];

  constructor(private http: HttpClient) {
    
  }

  updatePointsUser(points: number) {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    user.points= points;
    console.log(points);
    this.http.put(`${this.springBootUrl}/${user.id}/points`, user, {observe: 'response',withCredentials: true })
    .subscribe({
        next: (response) => {
          console.log(response);
          const user= response.body;
          localStorage.setItem('user', JSON.stringify(user!));
        },
        error: (error: any) => {
            console.error('Si è verificato un errore nel salvataggio:', error);
        }
    });
}

  getAllUsers() {
      this.http.get<Player[]>(`${this.springBootUrl}`)
      .subscribe({
        next: (response) => {
            this.players = response;
            console.log('Utenti recuperati dall\'API:', this.players),{ withCredentials: true };
        },
        error: (error: any) => {
          console.error('Si è verificato un errore nel recupero degli utenti:', error);
        }
      });
  }
}

