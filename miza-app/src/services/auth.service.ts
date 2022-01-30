import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

const baseUrl = environment.apiUrl + 'auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  decodedToken: any | undefined;
  private userSubject: BehaviorSubject<User> | undefined;
  public user: Observable<User> |undefined;
  private photoUrl = new BehaviorSubject<string>('../../assets/default.png');
  public currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient,
    public router: Router, private alertify: AlertifyService
) {
    this.loadData();
}
  login(model: any) {
    return this.http.post<{user:User, token: string}>(baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.userSubject = new BehaviorSubject(user.user);
          this.user = this.userSubject.asObservable();
          console.log(user);
        }
        return (response);
      })
    );
  }

  register(user: User) {
    return this.http.post(baseUrl + 'register', user);
  }
  get currentUser(){
    return this.userSubject?.value;
  }
  get currentPhoto(){
    return this.photoUrl.value;
  }
  roleMatch(allowedRoles:string[]): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach((element) => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
  logout() {
    this.user = undefined;
    this.userSubject = undefined;
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  loadData(){
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if(user && token){
      const userJson = JSON.parse(user);
      this.userSubject = new BehaviorSubject<User>(
        userJson
      );
      this.user = this.userSubject.asObservable();
      this.photoUrl = new BehaviorSubject<string>(
        userJson.photoUrl
        );
      this.decodedToken = this.jwtHelper.decodeToken(token);
      this.currentPhotoUrl = this.photoUrl.asObservable();
    }
  }
}
