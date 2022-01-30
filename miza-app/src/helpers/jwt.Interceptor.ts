import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor  {

    constructor(private accountService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user: User | undefined = this.accountService.currentUser;
        const isLoggedIn = (user && localStorage.token);
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn) {
          request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + localStorage.token
                }

            });
        }
        return next.handle(request);
    }
}
