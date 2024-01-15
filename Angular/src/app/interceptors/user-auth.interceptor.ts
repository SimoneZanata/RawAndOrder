import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {

  constructor() { }

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
  
  private shouldExcludePath(url: string): boolean {
    const excludedPaths = ['https://api.themoviedb.org'];
    return excludedPaths.some(path => url.includes(path));
  }
}
