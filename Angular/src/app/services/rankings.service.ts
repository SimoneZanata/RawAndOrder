import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  springBootUrl =
    'http://localhost:8080/users';
  users: User[] = [];
  currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem("user") || '') as User;
  }

  addPointsUser(user: User, id: number, points: number) {
    this.http.put<User>(`${this.springBootUrl}/${id}/${points}`, user).subscribe({
      next: (response) => {
        this.currentUser = response;
        console.log('Utente aggiornato', this.currentUser);
        localStorage.setItem("user", JSON.stringify(response));
      },
      error: (error: any) => {
        console.error('Si è verificato un errore nel salvataggio:', error);
      }
    });
  };


  getAllUsers() {
    this.http.get<User[]>(`${this.springBootUrl}/all`).subscribe({
      next: (response) => {
        this.users = (response);
        console.log('Utenti recuperati dall\'API:', this.users);
      },
      error: (error: any) => {
        console.error('Si è verificato un errore nel recupero degli utenti:', error);
      }
    });
  };

}

