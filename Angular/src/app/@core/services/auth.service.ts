import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { LoginDTO, RegisterDTO, User, UserUpdate } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  springBootUrl = 'http://localhost:8080/users';

  constructor(private router: Router, private http: HttpClient) {}

  login(loginData: LoginDTO) {
    console.log('auth service.ts', loginData);
    this.router.navigateByUrl("/login");

    return this.http.post<LoginDTO>(`${this.springBootUrl}/login`, loginData);
  }

  register(registerData: RegisterDTO) {
    console.log('auth service.ts', registerData);
    this.router.navigateByUrl("/register");

    return this.http.post<RegisterDTO>(`${this.springBootUrl}/register`,registerData);
  }

  getAllUsers(){
    this.router.navigateByUrl("/rankings");
    return this.http.get<User[]>(`${this.springBootUrl}/all`);
  }

  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }

  updateProfile(updatedUser: UserUpdate) {
    const userId = this.getCurrentUser().id;
    return this.http.put<User>(`${this.springBootUrl}/${userId}`, updatedUser);
  }
}
