import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User} from '../models/user';
import { Observable } from 'rxjs';
import { AuthService } from '../@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  springBootUrl =
    'http://localhost:8080/users';
  users: User[] = [];

  constructor(private http: HttpClient,private auth: AuthService) {
    
  }

  updatePointsUser(points: number) {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    user.points=+points;
    this.http.put(`${this.springBootUrl}/${user.id}/updatePoints`, user, {observe: 'response',withCredentials: true })
    .subscribe({
        next: (response) => {
            console.log('punteggio aggiornato',response);
            const csrfToken = response.headers.get('X-CSRF-TOKEN');
            console.log('CSRF Token dalla risposta:', csrfToken);
        },
        error: (error: any) => {
            console.error('Si è verificato un errore nel salvataggio:', error);
        }
    });
}

getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

  getAllUsers() {
      this.http.get<User[]>(`${this.springBootUrl}/all`).subscribe({
        next: (response) => {
            this.users = response;
            console.log('Utenti recuperati dall\'API:', this.users),{ withCredentials: true };
        },
        error: (error: any) => {
          console.error('Si è verificato un errore nel recupero degli utenti:', error);
        }
      });
  }
}

