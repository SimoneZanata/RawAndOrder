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


constructor(private router: Router, private http: HttpClient) {}

addPointsUser(user: User, id: number, points: number): Observable<User> {
  return this.http.put<User>(`${this.springBootUrl}/${id}/${points}`,  user);
}
  getAllUsers(){
    return this.http.get<User[]>(`${this.springBootUrl}/all`);
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }
}

