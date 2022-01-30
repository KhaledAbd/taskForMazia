import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { UserService } from 'src/services/user.service';
import { AlertifyService } from 'src/services/alertify.service';
import { AuthService } from 'src/services/auth.service';

@Injectable({providedIn: 'root'})
export class MessageResolver implements Resolve<Message[]>{
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';
    constructor(private userService: UserService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService){

                }
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]>{
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber,
            this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('error to get Users');
                this.router.navigate(['/home']);
                return of(null);
            }
            )
        );
    }

}
