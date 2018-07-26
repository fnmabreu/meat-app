import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

import { MEAT_API } from '../../app.api';
import { User } from './user.model';

@Injectable()
export class LoginService {
  loginUrl = `${MEAT_API.baseUrl}/login`;

  user: User;
  lastUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.loginUrl}`, {
        email: email,
        password: password
      })
      .pipe(tap(user => (this.user = user)));
  }

  logout() {
    this.user = undefined;
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }
}