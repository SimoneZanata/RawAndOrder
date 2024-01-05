import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable, map, tap} from "rxjs";
import { LoginDTO, RegisterDTO, User, UpdateUser} from "src/app/models/user";



@Injectable({
  providedIn: "root",
})
export class AuthService {
  springBootUrl = 'http://localhost:8080/users';

  constructor(private router: Router, private http: HttpClient, private c: CookieService) { }



  login(loginData: LoginDTO): Observable<any> {
    return this.http.post(`${this.springBootUrl}/login`, loginData, { observe: 'response',withCredentials: true})
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

   getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  deleteCookie(key: string) {
    document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
 
 


  register(registerData: RegisterDTO) {
    return this.http.post(`${this.springBootUrl}/register`, registerData);
  }

  getAllUsers() {
    this.router.navigateByUrl("/rankings");
    return this.http.get<User[]>(`${this.springBootUrl}/all`);
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem('moviesSortedByUser');
    localStorage.removeItem('sortedCriteria');
    localStorage.removeItem('saveState');
    localStorage.removeItem('Authorization');
    localStorage.removeItem('XSRF-TOKEN');
    this.deleteCookie('XSRF-TOKEN');
    this.deleteCookie('JSESSIONID');
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }

  updateProfile(updatedUser: UpdateUser) {
    const userId = this.getCurrentUser().id;
    return this.http.put<User>(`${this.springBootUrl}/${userId}`, updatedUser);
  }

 

 
}
