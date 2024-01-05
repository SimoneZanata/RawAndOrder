import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../@core/services/auth.service';

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let httpHeaders = new HttpHeaders();
    const userString = localStorage.getItem('user');
    if (this.shouldExcludePath(request.url)) {
      return next.handle(request);
    }
    if (userString !== null) {
      const authorization = localStorage.getItem('Authorization');
      const csrf = localStorage.getItem('XSRF-TOKEN');
      if (authorization && csrf) {
        httpHeaders = httpHeaders.append('Authorization', authorization);
        httpHeaders = httpHeaders.append('X-XSRF-TOKEN', csrf);
        httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest'); 
        request = request.clone({
          headers: httpHeaders
        });
      }     
    }
    return next.handle(request)
  }
  

  deleteCookie(key: string) {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

  getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  

  private shouldExcludePath(url: string): boolean {
    const excludedPaths = ['https://api.themoviedb.org'];
    return excludedPaths.some(path => url.includes(path));
  }
}
