import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,tap } from "rxjs";
import { LoginDTO, RegisterDTO, User, UpdateUser } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  springBootUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(loginData: LoginDTO): Observable<any> {
    return this.http.post(`${this.springBootUrl}/login`, loginData, { observe: 'response', withCredentials: true })
      .pipe(
        tap((response: HttpResponse<any>) => {
          const authorization = response.headers.get('Authorization');
          const csrf = this.getCookie('XSRF-TOKEN')
          const user = response.body;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('Authorization', authorization!);
          localStorage.setItem("XSRF-TOKEN", csrf!);
        })
      );
  }

  register(registerData: RegisterDTO) {
    return this.http.post(`${this.springBootUrl}/register`, registerData);
  }

  updateProfile(updatedUser: UpdateUser) {
    const userId = this.getCurrentUser().id;
    return this.http.put<User>(`${this.springBootUrl}/users/${userId}/profile`, updatedUser, { withCredentials: true });
  }

  logoutApi() {
    return this.http.get(`${this.springBootUrl}/logout`, { withCredentials: true })
  }

  getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }
}
